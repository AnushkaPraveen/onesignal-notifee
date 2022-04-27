export const initial=()=>{
    console.log('====================================');
    console.log("This is initial testing code");
    console.log('====================================');
}

export const notificationPress=()=>{
    console.log('====================================');
    console.log("This is working on pressing the notification");
    console.log('====================================');
}

export const actionPress=(actionId)=>{
    
    switch(actionId){
        case 'action1':
            console.log("This is action1 ");
            break;
        case 'action2':
            console.log("This is action2");
            break; 
        case 'action3':
            console.log("This is action3");
            break;  
        default:
            console.log("This is Action Press"); 
            break;      
    } 

}
