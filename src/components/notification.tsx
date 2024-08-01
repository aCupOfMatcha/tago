import { useState, useEffect } from'react';
import { notification } from 'antd';

function useNotification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationData, setNotificationData] = useState<{
    message: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen && notificationData) {
      notification.open({
        message: notificationData.message,
        description: notificationData.description
      });
      setIsOpen(false);
      setNotificationData(null);
    }
  }, [isOpen, notificationData]);

  const openNotification = (data: { message: string; description: string }) => {
    setIsOpen(true);
    setNotificationData(data);
  };

  return openNotification;
}

export default useNotification;