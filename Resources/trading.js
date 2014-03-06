//Trading indexes we have processed
var tradingIndexes = '';

//UI components
var tradingIndexesTableData = [];
var tradingIndextableView = null;

function buildTradingView(){
    tradingIndextableView = Ti.UI.createTableView({
        top:10,
        bottom:0,
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        backgroundColor:'transparent'
    });
    
    return tradingIndextableView;
}

function createTradingRow(indexTitle, bidAmount, offerAmount){
 
    //formatting
    if(bidAmount.length >= 5){
        bidAmount = bidAmount.substring(0,5);
    }
    
    if(offerAmount.length >= 5){
        offerAmount = offerAmount.substring(0,5);
    }
    
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
            height:80,
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
            height:40
        });
        
        var askLabel = Ti.UI.createLabel({
            text:'ask',
            color:'white',
            top:2,
            textAlign:'center',
            font:{fontSize:10, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var askPriceLabel = Ti.UI.createLabel({
            text:offerAmount,
            color:'white',
            //top:10,
            textAlign:'center',
            font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
        });
        
        boxAsk.add(askPriceLabel);
        boxAsk.add(askLabel);
    
        var boxBid = Ti.UI.createView({
            right:75,
            backgroundColor:'black',
            width:80,
            height:40
        });
        
        var bidLabel = Ti.UI.createLabel({
            text:'bid',
            color:'white',
            top:2,
            textAlign:'center',
            font:{fontSize:10, fontWeight:'bold', fontFamily:'Calibri'}
        });
        
        var bidPriceLabel = Ti.UI.createLabel({
            text:bidAmount,
            color:'white',
            //top:10,
            textAlign:'center',
            font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
        });
        
        boxBid.add(bidPriceLabel);
        boxBid.add(bidLabel);
        
        var amountField = Ti.UI.createTextField({
            backgroundColor:'#fafafa',
            value:'',
            hintText:'unit amount',
            top:55,
            left:75,
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
