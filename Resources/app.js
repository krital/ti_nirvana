var ENABLE_TAB_IOT = true;

//imports
Ti.include('trading.js');
Ti.include('chat.js');
Ti.include('news.js');
Ti.include('utils.js');
Ti.include('dao.js');
Ti.include('iot.js');

//device detection
var IPHONE5 = false;
if(Ti.Platform.displayCaps.platformHeight == 568){
    IPHONE5 = true; 
}

var IMAGE_PATH = 'images/iphone/';

//Webview - titanium event types
var EVENT_TRADE_INDEX = "app:trade_index";
var EVENT_TRADE = "app:trade";
var EVENT_CHAT = "app:chat";
var EVENT_RSS = "app:rss";
var EVENT_IOT = "app:iot";
var EVENT_IOT_SUBSCRIBE = "app:iot:subscribe";

var EVENT_FROM_CHAT = "app:from_chat";
var EVENT_FROM_TRADE = "app:from_trade";
var EVENT_FROM_IOT = "app:from_iot";

//Colors
var COLOR_BG = '#32323a';
var COLOR_LIGHT_BLUE = '#01aef0';
var COLOR_LIGHT_GREEN = '#a9d86e';
var COLOR_LIGHT_RED = '#ff6c60';
var COLOR_DARK_GRAY = 'black';

var userObject = getUserObject();

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup({tintColor:'white', tabsBackgroundColor:COLOR_DARK_GRAY});

Ti.App.addEventListener('paused',function(e){
    Ti.API.info("app was paused from the foreground: "+JSON.stringify(e));
    sendIOTMessage(getUserObject().fname, 'iOS device disconnected');
});

Ti.App.addEventListener('resumed', function(e){
    Ti.API.info("app has resumed from the background: "+JSON.stringify(e));
    setTimeout(function(){
        sendIOTMessage(getUserObject().fname, 'iOS device connected');
    }, 1500);
    
});

Ti.App.addEventListener(EVENT_IOT_SUBSCRIBE, function(e) {
    Ti.API.info('IOT subscribed');
    Ti.App.fireEvent(EVENT_FROM_IOT, {from:userObject.fname, message:'iOS device connected'});
});

function sendIOTMessage(user, msg){
    Ti.App.fireEvent(EVENT_FROM_IOT, {from:user, message:msg});
}

var totalRSSFeeds = 0;
var initialisedRSS = false;
Ti.App.addEventListener(EVENT_RSS, function(e) {
    //Ti.API.info('webview rss: '+JSON.stringify(e));
    
    totalRSSFeeds++;
    if(totalRSSFeeds >= 150){
        initialisedRSS = true;
    }
    
    var source = e.source;
    var link = e.link;
    var time = e.time;
    createNewsRow(source, link, time);
    
    if(initialisedRSS){
        if(!tab3.active){
            tab3.setBadge(tab3.getBadge() + 1);
        }
    }
});

Ti.App.addEventListener(EVENT_TRADE_INDEX, function(e) {
    //Ti.API.info('webview trade index: '+JSON.stringify(e));
    
    var indexName = e.indexName;
    var indexNameClean = e.indexNameClean;
    var bid = e.bid;
    var offer = e.offer;
    createTradingRow(indexName, bid, offer);
});

Ti.App.addEventListener(EVENT_TRADE, function(e) {
    //Ti.API.info('webview trade: '+JSON.stringify(e));
    
    var trader = e.trader;
    var sellCCY = e.sellCCY;
    var when = e.when;
    var rate = e.rate;
    var time = e.time;
    var buyAmount = e.buyAmount;
    var sellAmount = e.sellAmount;
    var buyCCY = e.buyCCY;
    
    createTradingHistoryRow(trader, time, rate, buyAmount, buyCCY, sellAmount, sellCCY);
});

Ti.App.addEventListener(EVENT_CHAT, function(e) {
    //Ti.API.info('webview chat: '+JSON.stringify(e));
    createMessageRow(e.message, e.time, e.from, false); 
    chatTableView.scrollToIndex(chatTableView.data[0].rows.length-1);
    
    
    if(!tab1.active){
        tab1.setBadge(tab1.getBadge() + 1);
    }
});

Ti.App.addEventListener(EVENT_IOT, function(e) {
    Ti.API.info('webview iot: '+JSON.stringify(e));
    createIOTRow(e.message, e.time, e.from, false); 
    //chatTableView.scrollToIndex(chatTableView.data[0].rows.length-1);
    
    
    if(!tab4.active){
        //showIOTNotification(e.from, e.message);
        tab4.setBadge(tab4.getBadge() + 1);
    }
});

function showIOTNotification(from, msg){
    var notificationView = Ti.UI.createView({
        backgroundColor:'black',
        width:'100%',
        height:50,
        top:-50
    });
    
    if(tab1.active){
        win1.add(notificationView);
    } else if(tab2.active){
        win2.add(notificationView);
    } else if(tab3.active){
        win3.add(notificationView);
    }
    
    notificationView.animate({top:10, duration:450}, function(){
        
    });
}

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({  
    title:'Chat',
    barColor:COLOR_LIGHT_BLUE,
    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
    backgroundColor:COLOR_BG
});
var tab1 = Titanium.UI.createTab({  
    icon:'images/iphone/tabs/email_circle.png',
    title:'Chat',
    window:win1
});

tab1.addEventListener('focus', function(){
   tab1.setBadge(); 
});

//webview handles all the comms
var webview = Ti.UI.createWebView({
   url:'test_works.html',
   visible:false 
});


win1.add(buildChatView());
win1.add(webview);

// create controls tab and root window
var win2 = Titanium.UI.createWindow({  
    title:'Trading',
    tintColor:'white',
    barColor:COLOR_LIGHT_BLUE,
    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
    backgroundColor:COLOR_BG
});

win2.add(buildTradingView());

//trading reorder button
var tradingReorderButton = Ti.UI.createButton({
    title:'Reorder',
    color:'white',
    tintColor:'#ffffff'
});

//trading reorder event listener
tradingReorderButton.addEventListener('click', function(){
   if(tradingIndextableView.moving == true){
       tradingIndextableView.moving = false;
       tradingReorderButton.title = 'Reorder';
   } else {
       tradingIndextableView.moving = true;
       tradingReorderButton.title = 'Done';
   }
});

win2.setRightNavButton(tradingReorderButton);

var tradingButton = Ti.UI.createButton({
    title:'Demo',
    color:'white',
    tintColor:'#ffffff'
});

tradingButton.addEventListener('click', function(){
   var chartView = Ti.UI.createWebView({
       url:'charts/examples/line-markers/index.htm'
   });
   
   win2.add(chartView);
});

//win2.setLeftNavButton(tradingButton);

var tab2 = Titanium.UI.createTab({  
    icon:'images/iphone/tabs/chart_up.png',
    title:'Trading',
    window:win2
});

// create controls tab and root window
var win3 = Titanium.UI.createWindow({  
    title:'News',
    tintColor:'white',
    barColor:COLOR_LIGHT_BLUE,
    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
    backgroundColor:COLOR_BG
});

var tab3 = Titanium.UI.createTab({  
    icon:'images/iphone/tabs/rss.png',
    title:'News',
    window:win3
});

tab3.addEventListener('focus', function(){
   tab3.setBadge(); 
});

win3.add(buildNewsView());

//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  

var win4, tab4 = null;
if(ENABLE_TAB_IOT){
    // create controls tab and root window
    win4 = Titanium.UI.createWindow({  
        title:'IOT',
        tintColor:'white',
        barColor:COLOR_LIGHT_BLUE,
        statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        backgroundColor:COLOR_BG
    });
    
    tab4 = Titanium.UI.createTab({  
        icon:'images/iphone/tabs/mobile_signal.png',
        title:'IOT',
        window:win4
    });
    
    tab4.addEventListener('focus', function(){
       tab4.setBadge(); 
    });
    
    win4.add(buildIOTView());
    tabGroup.addTab(tab4); 
}

//Check for persisted user
if(!userObject.fname){
    var initialWindow = buildInitialWindow();

    var navigationWindow = Titanium.UI.iOS.createNavigationWindow({
       window: initialWindow
    });
    
    navigationWindow.open();    
} else {
    tabGroup.open();
}
