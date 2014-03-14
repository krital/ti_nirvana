//UI components
var iotTableView, iotView = null;

function buildIOTView(){
    iotView = Ti.UI.createView({
        //top:0,
        //bottom:0    
    });
    
    iotTableView = Ti.UI.createTableView({
        top:5,
        height:IPHONE5 ? 421 : 324,
        width:'95%',
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        backgroundColor:'transparent',
        minRowHeight:75
    });
    
    iotTableView.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: 'transparent'
    });
    
    iotView.add(iotTableView);
    
    return iotView;
}

function createIOTRow(msg, time, name, myMessage){
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
    
    iotTableView.appendRow(row);
}
