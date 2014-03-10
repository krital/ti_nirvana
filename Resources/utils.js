//Creates the initial window
function buildInitialWindow(){
    var initialWindow = Ti.UI.createWindow({
        backgroundImage:IMAGE_PATH+'lock.jpg',
        fullscreen:false,
        //statusBarStyle:Titanium.UI.iPhone.StatusBar.DARK_CONTENT,
        navBarHidden:true
    });
    
    var usernameField = Ti.UI.createTextField({
        hintText:'Please enter your name',
        paddingLeft:5,
        width:222,
        height:30,
        top:150,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:3,
        //borderColor:'c5c5c5',
        appearance:Ti.UI.KEYBOARD_APPEARANCE_ALERT,
        borderColor:'white',
        font:{fontSize:14, fontWeight:'bold', fontFamily:'Calibri'}
    });
    
    var avatar = Ti.UI.createImageView({
        image:IMAGE_PATH+'avatars/1.png',
        width:70,
        height:70,
        borderRadius:35,
        borderWidth:4,
        borderColor:'white',
        top:90
    });
    
    var buttonLogin = Ti.UI.createButton({
        title:'Ready',
        top:190,
        width:222,
        backgroundColor:COLOR_LIGHT_BLUE,
        color:'white',
        borderWidth:1,
        borderRadius:3,
        borderColor:COLOR_LIGHT_BLUE,
        font:{fontSize:18, fontWeight:'bold', fontFamily:'Calibri'}
    });
        
    buttonLogin.addEventListener('click', function(){
        if(usernameField.value == ''){
            usernameField.borderColor= 'red';
        } else {
            saveUserObject({fname:usernameField.value});
            
            tabGroup.open();
            navigationWindow.close();
        }
    });
    
    initialWindow.add(usernameField);
    initialWindow.add(avatar);
    initialWindow.add(buttonLogin);

    return initialWindow;
}