//UI components
var newsTableView, newsView = null;

function buildNewsView(){
    newsView = Ti.UI.createView({
        //top:0,
        //bottom:0    
    });
    
    newsTableView = Ti.UI.createTableView({
        top:5,
        //height:IPHONE5 ? 421 : 324,
        width:'95%',
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        backgroundColor:'transparent',
        minRowHeight:50
    });
    
    /*
    newsTableView.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: 'transparent'
    });
    */
   
    newsTableView.addEventListener('click', handleNewsTableClick);
    
    newsView.add(newsTableView);
    
    return newsView;
}

function getImageForNewsSource(name){
    if(name.toLowerCase() == 'reuters'){
        return 'images/iphone/news/reuters.png';
    } else if(name.toLowerCase() == 'guardian'){
        return 'images/iphone/news/guardian.jpg';
    } else if(name.toLowerCase() == 'cnn'){
        return 'images/iphone/news/cnn.png';
    } else if(name.toLowerCase() == 'forbes'){
        return 'images/iphone/news/forbes.jpg';
    } else if(name.toLowerCase() == 'businessweek'){
        return 'images/iphone/news/week.jpg';
    } else if(name.toLowerCase() == 'skynews'){
        return 'images/iphone/news/skynews.jpg';
    } else if(name.toLowerCase() == 'retailbulletin'){
        return 'images/iphone/news/retailbulletin.jpg';
    } else if(name.toLowerCase() == 'bbc'){
        return 'images/iphone/news/bbc.jpg';
    } 
}

function handleNewsTableClick(e){    
    //close button
    var closeButton = Ti.UI.createButton({
        title:'Close',
        color:'white',
        tintColor:'white'
    });
    
    var win = Ti.UI.createWindow({
        backgroundColor: 'blue',
        title:'News',
        barColor:COLOR_LIGHT_BLUE,
        rightNavButton:closeButton,
        statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        tintColor:'white'
    });
    
    closeButton.addEventListener('click', function(){
       navWin.close(); 
    });
    
    var webview = Ti.UI.createWebView({
        url:e.row.url
    });
    
    win.add(webview);
    
    var navWin = Ti.UI.iOS.createNavigationWindow({
        modal: true,
        window: win,
        tintColor:'white',
        statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT
    });
    navWin.open();
}

function handleNewsTableClick2(e){
    Ti.API.info('handleNewsTableClick() called');
    if(e.row.toggle){
        e.row.height = 75;
    } else {
        e.row.height = 180;
        
        var webview = Ti.UI.createWebView({
            url:e.row.url,
            width:'80%',
            height:'80%'
        });
        
        e.row.add(webview);
    }
}

function createNewsRow(source, link, time){
    var tmp = link.split("\"");
    
    var newsTitle = tmp[3].trim();
    var newsLink = tmp[5].trim();
    
    var row = Ti.UI.createTableViewRow({
        height:75,
        backgroundColor:'transparent',
        width:'90%',
        toggle:false,
        url:newsLink
    });
    
    var photoView = Ti.UI.createImageView({
        image:getImageForNewsSource(source),
        left:2,
        top:20,
        backgroundColor:'white',
        width:40,
        height:40
    });
        
    var timeLabel = Ti.UI.createLabel({
        text:time,
        color:'white',
        top:65,
        left:2,
        width:150,
        textAlign:'left',
        minimumFontSize:10,
        font:{fontSize:10, fontWeight:'bold', fontFamily:'Calibri'}
    });
        
    var msgLabel = Ti.UI.createLabel({
        text:newsTitle,
        color:'white',
        top:20,
        bottom:5,
        left:60,
        right:10,
        color:'white',
        height:'auto',
        width:'auto',//184
        textAlign:'left',
        //opacity:0.8,
        font:{fontSize:15, fontWeight:'bold', fontFamily:'Calibri'}
    });
    
    row.add(photoView);
    row.add(timeLabel);
    row.add(msgLabel);
    
    //newsTableView.appendRow(row);
    if(newsTableView.data[0] && newsTableView.data[0].rows && newsTableView.data[0].rows.length > 1){
        newsTableView.insertRowBefore(0, row);
    }else{
        newsTableView.appendRow(row);
    }
}
