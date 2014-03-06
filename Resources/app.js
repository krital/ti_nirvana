Ti.include('trading.js');
Ti.include('chat.js');
Ti.include('utils.js');

var IPHONE5 = false;
if(Ti.Platform.displayCaps.platformHeight == 568){
    IPHONE5 = true; 
}

//Webview - titanium event types
var EVENT_TRADE_INDEX = "app:trade_index";
var EVENT_TRADE = "app:trade";
var EVENT_CHAT = "app:chat";
var EVENT_FROM_CHAT = "app:from_chat";
var EVENT_FROM_TRADE = "app:from_trade";

//Colors
var COLOR_BG = '#32323a';
var COLOR_LIGHT_BLUE = '#01aef0';
var COLOR_LIGHT_GREEN = '#a9d86e';
var COLOR_LIGHT_RED = '#ff6c60';
var COLOR_DARK_GRAY = 'black';

var username = 'Jason Kritikos';

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


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
});

Ti.App.addEventListener(EVENT_CHAT, function(e) {
    //Ti.API.info('webview chat: '+JSON.stringify(e));
    Ti.API.info('webview chat: curently with '+chatTableView.data[0].rows.length+' rows');
    
    createMessageRow(e.message, '2m ago', e.from, false);
    //chatTableView.scrollToIndex(chatTableView.data[0].rows.length+1);
    //chatTableView.scrollToIndex(chatTableView.data[0].rows.length+1);
    
    chatTableView.scrollToIndex(chatTableView.data[0].rows.length-1);
});

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

//webview handles all the comms
var webview = Ti.UI.createWebView({
   url:'test_works.html',
   visible:false 
});

win1.add(buildChatView());
win1.add(webview);

createMessageRow('This is a test message', '2m ago', 'Christina Sigala', false);
createMessageRow('This is another test message', '2m ago', 'Christina Sigala', false);
createMessageRow('This is another test message, much longer this time, just to make sure that the label appears correctly!', '2m ago', 'Christina Sigala', false);

// create controls tab and root window
var win2 = Titanium.UI.createWindow({  
    title:'Trading',
    barColor:COLOR_LIGHT_BLUE,
    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
    backgroundColor:COLOR_BG
});

win2.add(buildTradingView());

var tab2 = Titanium.UI.createTab({  
    icon:'images/iphone/tabs/chart_up.png',
    title:'Trading',
    window:win2
});

//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();
