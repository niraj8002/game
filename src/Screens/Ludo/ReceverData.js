import { useParams } from 'react-router-dom';

const ReceiverComponent = () => {
  const { data } = useParams();
  const decodedData = JSON.parse(decodeURIComponent(data));
console.log("data",decodedData)
  return <div>Data received: {decodedData.Name}</div>;
};

export default ReceiverComponent;