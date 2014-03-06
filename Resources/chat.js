//UI components
var chatTableView, chatView, messageField, messageSendButton = null;

function buildChatView(){
    chatView = Ti.UI.createView({
        //top:0,
        //bottom:0    
    });
    
    chatTableView = Ti.UI.createTableView({
        top:5,
        height:IPHONE5 ? 421 : 324,
        width:'95%',
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        backgroundColor:'transparent',
        minRowHeight:75
    });
    
    chatTableView.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: 'transparent'
    });
    
     messageField = Ti.UI.createTextField({
        hintText:'Send a message',
        paddingLeft:5,
        width:252,
        height:30,
        bottom:1,
        left:10,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:3,
        borderColor:'c5c5c5',
        font:{fontSize:14, fontWeight:'bold', fontFamily:'Calibri'}
    });
    
    messageField.addEventListener('focus', handleChatFieldFocus);
    messageField.addEventListener('blur', handleChatFieldBlur);
    
    messageSendButton = Ti.UI.createButton({
        title:'Send',
        tintColor:COLOR_LIGHT_GREEN,
        bottom:1,
        right:10
    });
    
    messageSendButton.addEventListener('click', handleChatMessageSubmition);
    
    chatView.add(messageSendButton);
    chatView.add(chatTableView);
    chatView.add(messageField);
    
    return chatView;
}

function handleChatMessageSubmition(e){
    Ti.App.fireEvent(EVENT_FROM_CHAT, {from:username, message:messageField.value});
    
    messageField.value = '';
    messageField.blur();
    
    chatView.animate({bottom:0, duration:200});
    chatTableView.animate({height:IPHONE5 ? 421 : 324, duration:200});
    
    //used setTimeout because sometimes, it wouldn't respond
    var t = setTimeout(function(){
        chatTableView.scrollToIndex(chatTableView.data[0].rows.length - 1);
    },50);
}

function handleChatFieldFocus(){
    chatView.animate({bottom:180, duration:300});
    chatTableView.animate({height:IPHONE5 ? 236 : 140, duration:200});
    
    //used setTimeout because sometimes, it wouldn't respond
    var t = setTimeout(function(){
        chatTableView.scrollToIndex(chatTableView.data[0].rows.length - 1);
    },50);
}

function handleChatFieldBlur(){
    chatView.animate({bottom:0, duration:200});
    chatTableView.animate({height:IPHONE5 ? 421 : 324, duration:200});
    
    //used setTimeout because sometimes, it wouldn't respond
    var t = setTimeout(function(){
        chatTableView.scrollToIndex(chatTableView.data[0].rows.length - 1);
    },50);
}

function createMessageRow(msg, time, name, myMessage){
    if(name == username){
        myMessage = true;
    }
    
    var row = Ti.UI.createTableViewRow({
        //height:75,
        backgroundColor:'transparent',
        width:'90%'
    });
    
    var photoView, messageView, timeLabel, msgLabel = null;
    
    if(myMessage){
        photoView = Ti.UI.createView({
            right:2,
            top:20,
            backgroundColor:'white',
            width:40,
            height:40
        });
        
        timeLabel = Ti.UI.createLabel({
            text:'2m ago',
            color:'white',
            top:65,
            right:5,
            textAlign:'center',
            font:{fontSize:10, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var msgLabelContainer = Titanium.UI.createView({
            backgroundColor:COLOR_LIGHT_GREEN,
            top:20,
            bottom:15,
            right:53,
            width:Titanium.UI.SIZE,//214
            height:Titanium.UI.SIZE,
            borderWidth:1,
            borderColor:COLOR_LIGHT_GREEN,
            borderRadius:5
        });
        
        msgLabel = Ti.UI.createLabel({
            text:msg,
            color:'white',
            top:5,
            bottom:5,
            left:10,
            right:10,
            color:'black',
            height:'auto',
            width:'auto',//184
            textAlign:'left',
            opacity:0.7,
            font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
        });
    } else {
        photoView = Ti.UI.createView({
            left:2,
            top:20,
            backgroundColor:'white',
            width:40,
            height:40
        });
        
        timeLabel = Ti.UI.createLabel({
            text:'2m ago',
            color:'white',
            top:65,
            left:5,
            textAlign:'center',
            font:{fontSize:10, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var msgLabelContainer = Titanium.UI.createView({
            backgroundColor:COLOR_LIGHT_RED,
            top:20,
            bottom:15,
            left:53,
            width:Titanium.UI.SIZE,//214
            height:Titanium.UI.SIZE,
            borderWidth:1,
            borderColor:COLOR_LIGHT_RED,
            borderRadius:5
        });
        
        msgLabel = Ti.UI.createLabel({
            text:msg,
            color:'white',
            top:5,
            bottom:5,
            left:10,
            right:10,
            color:'black',
            height:'auto',
            width:'auto',//184
            textAlign:'left',
            opacity:0.7,
            font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
        });
    }
    
    msgLabelContainer.add(msgLabel);
        
    row.add(photoView);
    row.add(timeLabel);
    row.add(msgLabelContainer);
    
    chatTableView.appendRow(row);
}
