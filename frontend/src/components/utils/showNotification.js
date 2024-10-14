import toast from 'react-hot-toast';

// Notification function to display a message
export const showNotification = (message) => {
  toast.success(message, {
    position: 'top-bottom',
  });
};
