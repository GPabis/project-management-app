import { useContext, useEffect, useState } from 'react';

import NotificationContext from '../../store/notification-context';
import NotificationContainer from './NotificationContainer';
import NotificationText from './NotificationText';

const Notification: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const notificationCtx = useContext(NotificationContext);

    useEffect(() => {
        if (notificationCtx.messages) {
            setVisible(true);

            const showNotification = setTimeout(() => {
                notificationCtx.setNotification(false, '');
                setVisible(false);
            }, 10000);

            return () => {
                clearTimeout(showNotification);
            };
        }
    });

    return (
        <NotificationContainer error={notificationCtx.error} visible={visible}>
            <NotificationText>{notificationCtx.messages}</NotificationText>
        </NotificationContainer>
    );
};

export default Notification;
