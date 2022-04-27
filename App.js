import React,{useEffect}  from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import notifee from '@notifee/react-native';
import NotificationHandler from './app/notification';


let notificationHandler=new NotificationHandler();


const App= () => {
 
  useEffect(()=>{
    //OneSignal Init Code
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("a6dbd8e6-08f6-405c-8823-2a7a8517e966");
    //END OneSignal Init Code
    
    
    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
      },[])

      const onDisplayNotification=async()=>{
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
       await notifee.displayNotification({
         
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
            smallIcon: 'ic_launcher', 
        },
          
        });
      }
 

const displayNotification=()=>{
const payload={
  channelId:'default',
  name:'default',
  notificationId:'default',
  title:'Notifee Notification',
  body:'This is Notifee notification'
}
notificationHandler.getNotification(payload)
} 



  return (
   <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
   <Text>Hello</Text>
   <View>
   <Button title="Display Notification" onPress={onDisplayNotification} />
   </View> 
   <View style={{marginTop:10}}>
   <Button title="Display Notifee Notification" onPress={displayNotification} />
   </View>
   </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
