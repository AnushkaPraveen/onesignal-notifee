
import { Platform } from 'react-native';
import notifee, { AndroidStyle, AndroidCategory, AndroidColor, EventType, AndroidImportance, AndroidVisibility, AuthorizationStatus, TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';
import {
  Alert
} from 'react-native';
import { initial, notificationPress, actionPress } from './functions';
export default class NotificationHandler {

  handleNotifee = () => {
    console.log('====================================');
    console.log('Notifee Library functions');
    console.log('====================================');
  }

  getIOSPermission = async () => {
    await notifee.requestPermission();
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions');
    }
  }

  getNotification = async (payload) => {
    this.getIOSPermission()

    //notifee foreground event action handle (swicth)
    notifee.onForegroundEvent(async ({ type, detail }) => {
      switch (type) {
        case EventType.ACTION_PRESS:
          console.log(detail.pressAction.id)
          actionPress();
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
    /* 
    //notifee foreground event action handle (if conditions)
    
        notifee.onForegroundEvent(async({ type, detail }) => {
          if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
            console.log('User pressed an action with the id: ', detail.pressAction.id);
          }  
          if (type === EventType.PRESS) {
            console.log('User pressed notification',detail.notification);
            notificationPress();    
          }
          if (type === EventType.DISMISSED) {
            console.log('User dismissed notification',detail.notification);
            alert(detail.notification.title)
          }
        });
        notifee.onBackgroundEvent(({ type, detail }) => {
          if (type === EventType.ACTION_PRESS && detail.pressAction.id) {
            console.log('User pressed an action with the id: ', detail.pressAction.id);
          }
        }); */

    notifee.registerForegroundService(() => {
      return new Promise(() => {
        // Long running task...
      });
    });

    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      vibration: payload.vibration || true,
      lights: payload.light || true,
      visibility: payload.visibility || 0,
    });

    await notifee.setNotificationCategories([
      {
        id: payload.IosActionId || 'default',
        actions:
          payload.IosActions || []
      },
    ])
    try {
      await notifee.displayNotification({
        id: payload.notificationId || 'default',
        title: payload.title || 'default',
        subtitle: payload.subtitle || '',
        body: payload.body,
        android: {
          channelId,
          largeIcon: payload.Icon || 'ic_launcher',
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          style: { type: AndroidStyle.BIGTEXT, text: payload.body },
          style: payload.image || undefined,
          showTimestamp: payload.time || true,
          importance: payload.importance || 3,
          color: payload.color || '#495371',
          visibility: payload.visibility || 0,
          ongoing: payload.ongoing || false,
          asForegroundService: payload.foregroundService || false,
          colorized: payload.colorized || false,
          pressAction: {
            id: 'default',
          },
          actions: payload.AndroidActions || [],
        },
        ios: {
          categoryId: payload.IosActionId || 'default',
          sound: 'default',
          attachments:
            payload.IosImage || []
        },
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      })
    } catch (e) {
      console.log(e);
    }
  }

/*   updateNotification = async (payload) => {
    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
    });

    await notifee.displayNotification({
      id: payload.notificationId || '111',
      title: payload.title || 'default',
      body: payload.body,
      android: {
        channelId,
      },
    });
  } */

  scheduleNotification = async (payload) => {
    console.log('====================================');
    console.log(payload);
    console.log('====================================');

    //notifee foreground event action handle (swicth)
    notifee.onForegroundEvent(async ({ type, detail }) => {
      switch (type) {
        case EventType.ACTION_PRESS:
          /*  actionPress(detail.pressAction.id); */
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

    notifee.registerForegroundService(() => {
      return new Promise(() => {
        // Long running task...
      });
    });

    var date = new Date(payload.dateTime);
    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: payload.repeatType || undefined,
    };

    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      vibration: payload.vibration || true,
      lights: payload.light || true,
      visibility: payload.visibility || 0,
    });

    await notifee.setNotificationCategories([
      {
        id: payload.IosActionId || 'default',
        actions:
          payload.IosActions || []
      },
    ])
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: payload.notificationId || '1111',
        title: payload.title || 'Date Schedule Notification',
        body: payload.body || 'This is Schedule Notification',
        showTimestamp: true,
        android: {
          channelId,
          largeIcon: payload.Icon || 'ic_launcher',
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          style: { type: AndroidStyle.BIGTEXT, text: payload.body },
          style: payload.image || undefined,
          showTimestamp: payload.time || true,
          importance: payload.importance || 3,
          color: payload.color || '#495371',
          visibility: payload.visibility || 0,
          ongoing: payload.ongoing || false,
          asForegroundService: payload.foregroundService || false,
          colorized: payload.colorized || false,
          actions: payload.AndroidActions || [],
        },
        ios: {
          categoryId: payload.IosActionId || 'default',
          sound: 'default',
          attachments:
            payload.IosImage || []
        },
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
      trigger,
    );
  }

  TimeScheduleNotification = async (payload) => {
    //notifee foreground event action handle (swicth)
    notifee.onForegroundEvent(async ({ type, detail }) => {
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

    notifee.registerForegroundService(() => {
      return new Promise(() => {
        // Long running task...
      });
    });

    console.log(payload);
    const date = new Date(Date.now());
    date.setHours(payload.hour);
    date.setMinutes(payload.minute);
    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: payload.repeatType || undefined
    };

    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      vibration: payload.vibration || true,
      lights: payload.light || true,
      visibility: payload.visibility || 0,
    });

    await notifee.setNotificationCategories([
      {
        id: payload.IosActionId || 'default',
        actions:
          payload.IosActions || []
      },
    ])
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: payload.notificationId || '1111',
        title: payload.title || 'Time Schedule Notification',
        body: payload.body || 'This is Schedule Notification',
        showTimestamp: true,
        android: {
          channelId,
          largeIcon: payload.Icon || 'ic_launcher',
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          style: { type: AndroidStyle.BIGTEXT, text: payload.body },
          style: payload.image || undefined,
          showTimestamp: payload.time || true,
          importance: payload.importance || 3,
          color: payload.color || '#495371',
          visibility: payload.visibility || 0,
          ongoing: payload.ongoing || false,
          asForegroundService: payload.foregroundService || false,
          colorized: payload.colorized || false,
          actions: payload.AndroidActions || [],
        },
        ios: {
          categoryId: payload.IosActionId || 'default',
          sound: 'default',
          attachments:
            payload.IosImage || []
        },
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
      trigger,
    );
  }

  //Interval Trigger Notification
  IntervalScheduleNotification = async (payload) => {
    //notifee foreground event action handle (swicth)
    notifee.onForegroundEvent(async ({ type, detail }) => {
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
    notifee.registerForegroundService(() => {
      return new Promise(() => {
        // Long running task...
      });
    });

    const IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: payload.interval || 15,
      timeUnit: payload.timeunit || "MINUTES",
    };

    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      vibration: payload.vibration || true,
      lights: payload.light || true,
      visibility: payload.visibility || 0,
    });

    await notifee.setNotificationCategories([
      {
        id: payload.IosActionId || 'default',
        actions:
          payload.IosActions || []
      },
    ])
    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: payload.notificationId || '1111',
        title: payload.title || 'Time Schedule Notification',
        body: payload.body || 'This is Schedule Notification',
        showTimestamp: true,
        android: {
          channelId,
          largeIcon: payload.Icon || 'ic_launcher',
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          style: { type: AndroidStyle.BIGTEXT, text: payload.body },
          style: payload.image || undefined,
          showTimestamp: payload.time || true,
          importance: payload.importance || 3,
          color: payload.color || '#495371',
          visibility: payload.visibility || 0,
          ongoing: payload.ongoing || false,
          asForegroundService: payload.foregroundService || false,
          colorized: payload.colorized || false,
          actions: payload.AndroidActions || [],
        },
        ios: {
          categoryId: payload.IosActionId || 'default',
          sound: 'default',
          attachments:
            payload.IosImage || []
        },
        foregroundPresentationOptions: {
          alert: true,
          badge: true,
          sound: true,
        },
      },
      IntervalTrigger,
    );
  }

  //Progress Indicators
  progressNotification = async (payload) => {

    //notifee foreground event action handle (swicth)
    notifee.onForegroundEvent(async ({ type, detail }) => {
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
    notifee.registerForegroundService(() => {
      return new Promise(() => {
        // Long running task...
      });
    });

    const channelId = await notifee.createChannel({
      id: payload.channelId || 'default',
      name: payload.name || 'default channel',
      importance: payload.importance || 3,
      visibility: payload.visibility || 0,
    });

    notifee.displayNotification({
      id: payload.notificationId || '1111',
      title: payload.title || '',
      body: payload.body || '',
      showTimestamp: payload.time | false,
      android: {
        channelId,
        showTimestamp: payload.time || false,
        ongoing: payload.ongoing || false,
        style: { type: AndroidStyle.BIGTEXT, text: payload.body },
        progress: {
          max: payload.progressSize || 0,
          current: payload.currentSize || 0,
          indeterminate: payload.indeterminate || false,
        },
      },
    });
  }


  batteryOptimizationEnabled = async () => {
    const batteryOptimizationEnabled = await notifee.isBatteryOptimizationEnabled();
    if (batteryOptimizationEnabled) {
      // 2. ask your users to disable the feature
      Alert.alert(
        'Restrictions Detected',
        'To ensure notifications are delivered, please disable battery optimization for the app.',
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: 'OK, open settings',
            onPress: async () => await notifee.openBatteryOptimizationSettings(),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    };
  }

  powerManagement = async () => {
    const powerManagerInfo = await notifee.getPowerManagerInfo();
    if (powerManagerInfo.activity) {
      // 2. ask your users to adjust their settings
      Alert.alert(
        'Restrictions Detected',
        'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
        [
          // 3. launch intent to navigate the user to the appropriate screen
          {
            text: 'OK, open settings',
            onPress: async () => await notifee.openPowerManagerSettings(),
          },
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    };
  }

  cancelNotification = async (notificationId) => {
    await notifee.cancelNotification(notificationId)
  }

  deleteChannel = async (channelId) => {
    await notifee.deleteChannel(channelId)
  }

  getBadgeCount = () => {
    notifee.getBadgeCount().then(count => console.log('Current badge count: ', count));
  }
  
  setBadgeCount = (count) => {
    notifee.setBadgeCount(count).then(() => console.log('Badge count set!'));
  }

  incrementBadgeCount = (count) => {
    notifee.incrementBadgeCount(count)
  }

  decrementBadgeCount = (count) => {
    notifee.decrementBadgeCount(count)
  }

  getTriggerNotification = () => {
    notifee.getTriggerNotificationIds().then(ids => console.log('All trigger notifications: ', ids));
  }
}









