import React, { useEffect } from 'react';
import Providers from './src/navigation';
import PushNotification from 'react-native-push-notification';

const App = () => {
    useEffect(() => {
        
        PushNotification.configure({
            onRegister: function(token) {
                console.log('Push Notification Token:', token);
            },
            onNotification: function(notification) {
                console.log('Received notification:', notification);
                notification.finish(PushNotification.FetchResult.NoData);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            requestPermissions: true,
        });

        const channelOptions = {
            channelId: 'chat-channel', 
            channelName: 'Chat Channel', 
            channelDescription: 'A channel for chat notifications', 
            soundName: 'default',
            importance: PushNotification.Importance.HIGH, 
        };

        PushNotification.createChannel(
            channelOptions,
           
        );
    }, []);

    return <Providers />;
};

export default App;
