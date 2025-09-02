// service-worker.js

// Define a variable to hold the subscription object
let subscription;

// Event listener for when the service worker is installed
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

// Event listener for when the service worker is activated
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

// Event listener for push notifications
self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push notification received:', data);

  // Display a notification
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: './static/media/Realludokinglogo.png'
  });
});

// Event listener for when the user clicks on the notification
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();

  // Perform some action when the notification is clicked
  // For example, open a new window
  event.waitUntil(
    clients.openWindow('https://winningadda.com')
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  // Store the subscription object received from the client
  if (event.data && event.data.type === 'SUBSCRIPTION') {
    subscription = event.data.subscription;
    console.log('Subscription object received:', subscription);
  }
});

// Send the subscription object to the server
const sendSubscriptionToServer = async () => {
  if (subscription) {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription })
      });
      console.log('Subscription sent to server:', response);
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  }
};

// Call the function to send subscription to server when the service worker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(sendSubscriptionToServer());
});

// Function to handle subscription updates
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Subscription expired');
  event.waitUntil(
    self.registration.pushManager.subscribe(event.oldSubscription.options)
      .then((newSubscription) => {
        console.log('New subscription:', newSubscription);
        // Send the new subscription to the server
        sendSubscriptionToServer();
      })
  );
});
