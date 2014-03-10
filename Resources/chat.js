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
        bottom:5,
        left:5,
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
        bottom:6,
        right:12
    });
    
    messageSendButton.addEventListener('click', handleChatMessageSubmition);
    
    chatView.add(messageSendButton);
    chatView.add(chatTableView);
    chatView.add(messageField);
    
    return chatView;
}

function handleChatMessageSubmition(e){
    if(messageField.value != ''){
        var username = getUserObject().fname;
        Ti.App.fireEvent(EVENT_FROM_CHAT, {from:username, message:messageField.value});
    
        messageField.value = '';
        messageField.blur();
        
        chatView.animate({bottom:0, duration:200});
        chatTableView.animate({height:IPHONE5 ? 421 : 324, duration:200});
        
        //used setTimeout because sometimes, it wouldn't respond
        if(chatTableView.data && chatTableView.data[0] && chatTableView.data[0].rows != null){
            var t = setTimeout(function(){
                chatTableView.scrollToIndex(chatTableView.data[0].rows.length - 1);
            },50);
        }
    }
}

function handleChatFieldFocus(){
    chatView.animate({bottom:180, duration:300});
    chatTableView.animate({height:IPHONE5 ? 236 : 140, duration:200});
    
    //used setTimeout because sometimes, it wouldn't respond
    if(chatTableView.data && chatTableView.data[0] && chatTableView.data[0].rows != null){
        var t = setTimeout(function(){
            chatTableView.scrollToIndex(chatTableView.data[0].rows.length - 1);
        },50);
    }
    
}

function handleChatFieldBlur(){
    chatView.animate({bottom:0, duration:200});
    chatTableView.animate({height:IPHONE5 ? 421 : 324, duration:200});
    
    //used setTimeout because sometimes, it wouldn't respond
    if(chatTableView.data && chatTableView.data[0] && chatTableView.data[0].rows != null){
        var t = setTimeout(function(){
            chatTableView.scrollToIndex(chatTableView.data[0].rows.length - 1);
        },50);
    }
}

function getImageForUser(name){
    var username = getUserObject().fname;
    
    if(name == username){
        return 'images/iphone/avatars/1.png';
    } else {
        var randomNumber = Math.floor((Math.random()*9)+2); 
        return 'images/iphone/avatars/'+randomNumber+'.png';
    }
}

function createMessageRow(msg, time, name, myMessage){
    var username = getUserObject().fname;
    
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
        photoView = Ti.UI.createImageView({
            image:getImageForUser(name),
            right:2,
            top:20,
            backgroundColor:'white',
            width:40,
            height:40
        });
        
        timeLabel = Ti.UI.createLabel({
            text:time,
            color:'white',
            top:65,
            right:2,
            width:40,
            textAlign:'center',
            minimumFontSize:10,
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
        
        nameLabel = Ti.UI.createLabel({
            text:name,
            color:'white',
            top:5,
            bottom:5,
            left:10,
            right:10,
            color:'black',
            height:'auto',
            width:'auto',//184
            textAlign:'right',
            opacity:0.7,
            font:{fontSize:12, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        msgLabel = Ti.UI.createLabel({
            text:msg,
            color:'white',
            top:18,
            bottom:5,
            left:10,
            right:10,
            color:'black',
            height:'auto',
            width:'auto',//184
            textAlign:'right',
            opacity:0.7,
            font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
        });
    } else {
        photoView = Ti.UI.createImageView({
            image:getImageForUser(name),
            left:2,
            top:20,
            backgroundColor:'white',
            width:40,
            height:40
        });
        
        timeLabel = Ti.UI.createLabel({
            text:time,
            color:'white',
            top:65,
            width:40,
            left:2,
            textAlign:'center',
            minimumFontSize:10,
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
        
        nameLabel = Ti.UI.createLabel({
            text:name,
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
            font:{fontSize:12, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        msgLabel = Ti.UI.createLabel({
            text:msg,
            color:'white',
            top:18,
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
    
    msgLabelContainer.add(nameLabel);
    msgLabelContainer.add(msgLabel);
        
    row.add(photoView);
    row.add(timeLabel);
    row.add(msgLabelContainer);
    
    chatTableView.appendRow(row);
}
