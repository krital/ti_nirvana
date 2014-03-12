//Trading indexes we have processed
var tradingIndexes = '';

//UI components
var tradingIndexesTableData = [];
var tradingIndextableView, tradingHistorytableView = null;

function buildTradingView(){
    var tradeView = Ti.UI.createView({  
    });
    
    tradingIndextableView = Ti.UI.createTableView({
        top:10,
        bottom:IPHONE5 ? 155 : 140,
        width:'100%',
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        backgroundColor:'transparent'
    });
    
    tradingHistorytableView = Ti.UI.createTableView({
        top:IPHONE5 ? 300 : 240,
        bottom:0,
        width:'100%',
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        backgroundColor:'transparent'
    });
    
    tradeView.add(tradingIndextableView);
    tradeView.add(tradingHistorytableView);
    
    return tradeView;
}

function createTradingHistoryRow(trader, time, rate, buyAmount, buyCCY, sellAmount, sellCCY){
    var rateAmount = rate.toString();
    
    //formatting
    if(rateAmount.length >= 5){
        //Ti.API.info('substring bid '+bidAmount);
        rateAmount = rateAmount.substring(0,7);
    }
    
    var msg = trader + " bought "+buyAmount+' of '+buyCCY+', sold '+sellAmount+' of '+sellCCY+' at a rate of '+rateAmount;
    
    var row = Ti.UI.createTableViewRow({
        height:60,
        backgroundColor:'transparent',
        width:'90%'
    });
    
    photoView = Ti.UI.createImageView({
        image:getImageForUser(trader),
        left:2,
        //top:20,
        backgroundColor:'white',
        width:35,
        height:35
    });
    
    timeLabel = Ti.UI.createLabel({
        text:time,
        color:'white',
        bottom:1,
        left:2,
        width:35,
        textAlign:'center',
        minimumFontSize:10,
        font:{fontSize:10, fontWeight:'bold', fontFamily:'Calibri'}
    });
    
    var msgLabelContainer = Titanium.UI.createView({
        backgroundColor:'transparent',
        //top:20,
        //bottom:15,
        left:53,
        right:10,
        width:Titanium.UI.SIZE,//214
        height:Titanium.UI.SIZE,
        borderWidth:1,
        borderColor:COLOR_LIGHT_GREEN,
        borderRadius:5
    });
    
    nameLabel = Ti.UI.createLabel({
        text:trader,
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
        top:5,
        bottom:5,
        left:10,
        right:10,
        height:'auto',
        width:'auto',//184
        textAlign:'left',
        //opacity:0.7,
        font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
    });
    
    //msgLabelContainer.add(nameLabel);
    msgLabelContainer.add(msgLabel);
        
    row.add(photoView);
    row.add(timeLabel);
    row.add(msgLabelContainer);
    
    if(tradingHistorytableView.data[0] && tradingHistorytableView.data[0].rows && tradingHistorytableView.data[0].rows.length > 1){
        tradingHistorytableView.insertRowBefore(0, row);
    }else{
        tradingHistorytableView.appendRow(row);
    }
}

function createTradingRow(indexTitle, bidAmount, offerAmount){
    //bidAmount = Math.round((bidAmount*10)/10);
    
    //Ti.API.info('createTradingRow() for bid '+bidAmount+' and offer '+offerAmount);
    bidAmount = bidAmount.toString();
    offerAmount = offerAmount.toString();
    
    //formatting
    if(bidAmount.length >= 5){
        //Ti.API.info('substring bid '+bidAmount);
        bidAmount = bidAmount.substring(0,7);
    }
    
    if(offerAmount.length >= 5){
        //Ti.API.info('substring offer '+offerAmount);
        offerAmount = offerAmount.substring(0,7);
    }
    
    while(offerAmount.length<7){offerAmount=offerAmount+"0";}
    while(bidAmount.length<7){bidAmount=bidAmount+"0";}
    
    //bidAmount = parseFloat(bidAmount.toFixed(5));
    //offerAmount = parseFloat(offerAmount.toFixed(5));
    
    if(tradingIndexes.indexOf(indexTitle) > -1){
        //Ti.API.info('Must update table for index '+indexTitle+' - checking '+tradingIndextableView.data[0].rows.length+' elements');
        var rowIndexToUpdate = null;
        
        //find the row we need to update
        for(var i=0; i < tradingIndextableView.data[0].rows.length ; i++) {
            if(tradingIndextableView.data[0].rows[i].tradeIndexTitle == indexTitle){
                rowIndexToUpdate = i;
                var currentOffer = tradingIndextableView.data[0].rows[rowIndexToUpdate].offer;
                var currentBid = tradingIndextableView.data[0].rows[rowIndexToUpdate].bid;
               // Ti.API.info('Row '+i+' updating '+indexTitle+' currentOffer='+currentOffer+' currentBid='+currentBid);
                
                var row = tradingIndextableView.data[0].rows[rowIndexToUpdate];
                
                var targetColorBid = '';
                if(bidAmount > currentBid){
                    targetColorBid = COLOR_LIGHT_GREEN;
                } else {
                    targetColorBid = COLOR_LIGHT_RED;
                }
                
                var targetColorOffer = '';
                if(offerAmount > currentOffer){
                    targetColorOffer = COLOR_LIGHT_GREEN;
                } else {
                    targetColorOffer = COLOR_LIGHT_RED;
                }
                
                //bid
                row.getChildren()[1].getChildren()[0].text = bidAmount;
                //offer
                row.getChildren()[2].getChildren()[0].text = offerAmount;
                
                row.getChildren()[1].animate({backgroundColor:targetColorBid, duration:200}, function(){
                   setTimeout(function(){
                       row.getChildren()[1].animate({backgroundColor:COLOR_DARK_GRAY, duration:200});
                   }, 5000); 
                });
                row.getChildren()[2].animate({backgroundColor:targetColorOffer, duration:200}, function(){
                    setTimeout(function(){
                       row.getChildren()[2].animate({backgroundColor:COLOR_DARK_GRAY, duration:200});
                   }, 5000);
                });
            }       
        }
        
        
        
    } else {
        //Ti.API.info('Creating trading index '+indexTitle+' tradingIndexes is '+tradingIndexes);
        
        var row = Ti.UI.createTableViewRow({
            height:100,
            backgroundColor:'transparent',
            width:'90%',
            tradeIndexTitle:indexTitle,
            bid:bidAmount,
            offer:offerAmount
        });
        
        var title = Ti.UI.createLabel({
            text:indexTitle,
            textAlign:'center',
            top:0,
            color:'white',
            font:{fontSize:16, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var boxAsk = Ti.UI.createView({
            left:75,
            backgroundColor:'black',
            width:80,
            height:60
        });
        
        var askLabel = Ti.UI.createLabel({
            text:'ask',
            color:'white',
            top:2,
            textAlign:'center',
            font:{fontSize:12, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var askPriceLabel = Ti.UI.createLabel({
            text:offerAmount,
            color:'white',
            bottom:10,
            textAlign:'center',
            font:{fontSize:20, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        boxAsk.add(askPriceLabel);
        boxAsk.add(askLabel);
    
        var boxBid = Ti.UI.createView({
            right:75,
            backgroundColor:'black',
            width:80,
            height:60
        });
        
        var bidLabel = Ti.UI.createLabel({
            text:'bid',
            color:'white',
            top:2,
            textAlign:'center',
            font:{fontSize:12, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var bidPriceLabel = Ti.UI.createLabel({
            text:bidAmount,
            color:'white',
            bottom:10,
            textAlign:'center',
            font:{fontSize:20, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        boxBid.add(bidPriceLabel);
        boxBid.add(bidLabel);
        
        var amountField = Ti.UI.createTextField({
            backgroundColor:'#fafafa',
            value:'',
            hintText:'unit amount',
            top:75,
            left:75,
            appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,
            right:75,
            font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
        });
    
        row.add(title);
        row.add(boxAsk);
        row.add(boxBid);
        row.add(amountField);
        
        //mark index as processed
        tradingIndexes += indexTitle +',';
        
        //add row to the table
        tradingIndexesTableData.push(row);
        tradingIndextableView.setData(tradingIndexesTableData);
    } 
}
