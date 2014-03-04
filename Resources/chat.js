function buildChatView(){
    var chatView = Ti.UI.createScrollView({
        top:0,
        bottom:0    
    });
    
    var tableView = Ti.UI.createTableView({
        top:10,
        bottom:20,
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        backgroundColor:'transparent'
    });
    
    var messageField = Ti.UI.createTextField({
        backgroundColor:'#fafafa',
        borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        value:'',
        hintText:'Enter your message',
        left:10,
        height:25,
        width:'80%',
        bottom:15,
        font:{fontSize:14, fontWeight:'regular', fontFamily:'Calibri'}
    });
    
    chatView.add(tableView);
    chatView.add(messageField);
    
    return chatView;
}

function createMessageRow(msg, time, name){
    
}
