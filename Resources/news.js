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
    
    newsTableView.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: 'transparent'
    });
    
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
    }
}

function createNewsRow(source, link, time){
    
    var tmp = link.split("\"");
    
    var newsTitle = tmp[3].trim();
    var newsLink = tmp[5].trim();
    
    var row = Ti.UI.createTableViewRow({
        //height:75,
        backgroundColor:'transparent',
        width:'90%'
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
