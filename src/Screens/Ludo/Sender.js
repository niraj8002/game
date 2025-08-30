// SenderComponent.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SenderComponent = () => {
  const [dataToSend, setDataToSend] = useState('');
  const history = useHistory();

  const handleSendData = () => {
    // Navigate to the ReceiverComponent and pass data via URL parameter
    history.push(`/receiver?data=${dataToSend}`);
  };

  return (
    <div>
      <h2>Sender Component</h2>
      <input
        type="text"
        value={dataToSend}
        onChange={(e) => setDataToSend(e.target.value)}
      />
      <button onClick={handleSendData}>Send Data</button>
    </div>
  );
};

export default SenderComponent;



