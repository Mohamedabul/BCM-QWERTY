import React,{useEffect,useState} from 'react';
import Card from './Card';
import './Cardcontainer.css';

interface CardData {
  name: string;
}

const CardContainer: React.FC = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/coreCapability'); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        const extractedNames = data.map((item: any) => ({
          name: item.name
        }));
        setCardData(extractedNames); 
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <Card 
          key={index} 
          label={card.name}  
          bgColor="#ff0000"  
          // sections={[]}      
        />
      ))}
    </div>
  );
};

export default CardContainer;













































