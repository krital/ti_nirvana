function buildTradingView(){
    var tableView = Ti.UI.createTableView({
        top:10,
        bottom:0,
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
        backgroundColor:'transparent'
    });
    
    //data
    var data = [];
    data.push(createRow("USD/EUR"));
    data.push(createRow("GBP/EUR"));
    data.push(createRow("USD/EUR"));
    data.push(createRow("GBP/EUR"));
    tableView.setData(data);
    
    return tableView;
}

function createRow(title){
    var row = Ti.UI.createTableViewRow({
        height:80,
        backgroundColor:'transparent',
        width:'90%'
    });
    
    var title = Ti.UI.createLabel({
        text:title,
        textAlign:'center',
        top:0,
        font:{fontSize:16, fontWeight:'bold', fontFamily:'Calibri'}
    });
    
    var boxAsk = Ti.UI.createView({
        left:50,
        backgroundColor:'black',
        width:100,
        height:40
    });
    
    var askLabel = Ti.UI.createLabel({
        text:'ask',
        color:'white',
        top:2,
        textAlign:'center',
        font:{fontSize:10, fontWeight:'regular', fontFamily:'Calibri'}
    });
    
    boxAsk.add(askLabel);
    
    var boxBid = Ti.UI.createView({
        right:50,
        backgroundColor:'black',
        width:100,
        height:40
    });
    
    var bidLabel = Ti.UI.createLabel({
        text:'bid',
        color:'white',
        top:2,
        textAlign:'center',
        font:{fontSize:10, fontWeight:'regular', fontFamily:'Calibri'}
    });
    
    boxBid.add(bidLabel);
    
    var amountField = Ti.UI.createTextField({
        backgroundColor:'#fafafa',
        value:'',
        hintText:'unit amount',
        top:55,
        left:50,
        right:50,
        font:{fontSize:12, fontWeight:'regular', fontFamily:'Calibri'}
    });
    
    row.add(title);
    row.add(boxAsk);
    row.add(boxBid);
    row.add(amountField);
    
    return row;
}
