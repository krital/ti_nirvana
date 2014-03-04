Ti.include('trading.js');
Ti.include('chat.js');

//Colors
var COLOR_BG = '#f1f2f7';
var COLOR_LIGHT_BLUE = '#01aef0';

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


Ti.App.addEventListener('app:fromWebView', function(e) {
    Ti.API.info('webview says: '+JSON.stringify(e));
});

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({  
    title:'Chat',
    barColor:COLOR_LIGHT_BLUE,
    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Chat',
    window:win1
});

var webview = Ti.UI.createWebView({
   url:'test_works.html',
   visible:true 
});

//win1.add(buildChatView());
win1.add(webview);

// create controls tab and root window
var win2 = Titanium.UI.createWindow({  
    title:'Trading',
    barColor:COLOR_LIGHT_BLUE,
    statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
    backgroundColor:COLOR_BG
});

win2.add(buildTradingView());

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Trading',
    window:win2
});

//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();
