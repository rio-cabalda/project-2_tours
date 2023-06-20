import { useEffect, useState } from "react";
import Loading from './components/Loading';
import Tours from './components/Tours';
import './index.css'
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const fetchTours = async () =>{
      
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if(!response.ok){
          setIsLoading(true);
          console.log('Tours was not fetch');
          return;
        }
        const jsonTours = await response.json();
        setTours(jsonTours);
        setIsLoading(false);
        
        
      } catch (error) {
        console.log('Tours was not fetch');
        setIsLoading(true);
      }
  }

  const removeTour =(id)=>{

    const newTours = tours.filter((tour)=> tour.id != id);
    setTours(newTours);
  }

  useEffect(()=>{
    setIsLoading(false);
    fetchTours();  

  },[]);

  if(isLoading){
    return <main>
      <Loading />
    </main>
  }

  if(tours.length === 0){
    return <main>
      <div className="title">
        <h2>No tours left</h2>
        <button type="button" style={{marginTop:"2rem"}} 
        className="btn"
        onClick={fetchTours}>
          Refresh
        </button>
      </div>
    </main>
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App
