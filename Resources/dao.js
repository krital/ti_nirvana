//Returns the persisted user object
function getUserObject(){
    var obj = {};
    if(Ti.App.Properties.getObject('user') != null){
        obj = Ti.App.Properties.getObject('user');
    }
    
    //Ti.API.info('getUserObject() returns user with id '+obj.userId);
    return obj; 
}

//Updates the global user object - only keys in obj are updated
function saveUserObject(obj){
    //Ti.API.info('saveUserObject '+JSON.stringify(obj));
    
    //image
    if(typeof obj.image_path != 'undefined'){
        userObject.image_path = obj.image_path; 
    }
    
    if(typeof obj.thumb_path != 'undefined'){
        userObject.thumb_path = obj.thumb_path; 
    }
    
    if(obj.fname){
        userObject.fname = obj.fname; 
    }
    
    if(obj.lname){
        userObject.lname = obj.lname; 
    }
    
    if(obj.email){
        userObject.email = obj.email;   
    }
    
    if(obj.facebook_id){
        userObject.facebook_id = obj.facebook_id;   
    }
    
    if(obj.gender){
        userObject.gender = obj.gender;
    }
   
    if(obj.userId){
        userObject.userId = obj.userId;
    }
    
    if(obj.token){
        userObject.token = obj.token;
    }
    
    Ti.App.Properties.setObject('user', userObject);
}