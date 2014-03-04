//Ti.include('lib/nirvana.js');

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


Ti.App.addEventListener('app:fromWebView', function(e) {
    Ti.API.info('webview says: '+JSON.stringify(e));
});

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Chat',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Chat',
    window:win1
});

var webview = Ti.UI.createWebView({
   url:'test.html' 
});

win1.add(webview);

// create controls tab and root window
var win2 = Titanium.UI.createWindow({  
    title:'Trading',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Trading',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'I am Window 2',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

//  add tabs
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

// open tab group
tabGroup.open();
