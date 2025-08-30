import { Link } from 'react-router-dom';

const SenderComponent = () => {
  const dataToSend = { key: 'value' ,Name:'Hemraj'};

  return (
    <Link to={`/receiver/${encodeURIComponent(JSON.stringify(dataToSend))}`}>
      Go to Receiver
    </Link>
  );
};
export default SenderComponent ;