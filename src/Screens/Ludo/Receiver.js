// ReceiverComponent.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ReceiverComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const receivedData = queryParams.get('data');

  return (
    <div>
      <h2>Receiver Component</h2>
      <p>Received Data: {receivedData}</p>
    </div>
  );
};

export default ReceiverComponent;
