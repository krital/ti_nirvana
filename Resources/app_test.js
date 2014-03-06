var win = Titanium.UI.createWindow({
    title : 'Win 1',
    backgroundColor : '#fff'
});
var tab1 = Titanium.UI.createTab({
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window: win
});
 
var intContentCount = 0;
 
var scrollView = Ti.UI.createScrollView({
    backgroundColor: 'orange',
    contentHeight: 'auto',
    contentWidth: 'auto',
    height: Ti.UI.FILL,
    showHorizontalScrollIndicator: true,
    showVerticalScrollIndicator: true,
    width: Ti.UI.FILL
});
win.add(scrollView);
 
var view = Ti.UI.createView({
    backgroundColor: 'yellow',
    bottom: 0,
    height: Ti.UI.SIZE,
    layout: 'vertical',
    width: Ti.UI.FILL
});
scrollView.add(view);
 
var btnTest = Ti.UI.createButton({
    title: 'add another'
});
btnTest.addEventListener('click', function (e) {
    intContentCount = intContentCount + 1;
    // just adding a label here but your could add
    // a view and put a label and button inside if you wish
    var lbl = Ti.UI.createLabel({
        height: Ti.UI.SIZE,
        text: 'Example Content: ' + intContentCount,
        width: Ti.UI.FILL
    });
    view.add(lbl);
    scrollView.scrollToBottom();
});
win.setRightNavButton(btnTest);
var tabGroup = Titanium.UI.createTabGroup();
tabGroup.addTab(tab1);
tabGroup.open();