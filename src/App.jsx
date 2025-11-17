import { useEffect, useState } from 'react'
import './App.css'
import Auth from './components/auth.jsx'
import Movies from './components/Movies.jsx'
import {db} from './config/firebase.js'
import { collection, getDocs } from 'firebase/firestore';


function App() {

  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const fetchMovies = async () => {

     try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
      } catch (err) {
      console.error("Erro ao buscar filmes: ", err);
      }
    };
    
    fetchMovies();
  }, []);

  return <div className='App'>
    
    <h1>Qual seu filme favorito?</h1>
    <Auth></Auth>
    <Movies></Movies>
    
    
  </div>;
}

export default App
