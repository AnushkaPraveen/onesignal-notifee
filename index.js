/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';
import { notificationPress, actionPress } from './app/functions';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  switch (type) {
    case EventType.ACTION_PRESS:
      actionPress(detail.pressAction.id);
      break;
    case EventType.PRESS:
      notificationPress()
      break;
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      alert(detail.notification.title)
      break;
  }
})

/* notifee.onBackgroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
      console.log('User pressed an action with the id: ', detail.pressAction.id);
    }
    if (type === EventType.PRESS) {
      console.log('User pressed notification',detail.notification);
      alert(detail.notification.title)
    }
    if (type === EventType.DISMISSED) {
      console.log('User dismissed notification',detail.notification);
      alert(detail.notification.title)
    }
  }); */
  
AppRegistry.registerComponent(appName, () => App);
