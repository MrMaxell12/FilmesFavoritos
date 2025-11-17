import { db } from '../config/firebase.js';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

function Movies() {
    // Adicionar filmes à coleção "movies" no Firestore
    const [title, setTitle] = useState("");
    const [releaseData, setReleaseData] = useState(0);

    // Estado para armazenar a lista de filmes
    const [movieList, setMovieList] = useState([]);
    
    const moviesCollectionRef = collection(db, "movies");
    
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
        

    useEffect(() => {
        fetchMovies();
    }, []);



    const onSubmitMovie = async () => {
        // Lógica para adicionar filme ao Firestore
        try {
            await addDoc(moviesCollectionRef, {
                title: title,
                releaseData: releaseData,
            });

            fetchMovies(); // Atualiza a lista de filmes após adicionar um novo
        } catch (err) {
        console.error("Erro ao adicionar filme: ", err);
        }
    };


    return(
        
        <div>
        <br />
        <h2>Adicionar um novo filme!</h2>

        <input placeholder='Título do Filme...' onChange={(e) => setTitle(e.target.value)}></input>
        <input type="number" placeholder='Ano de Lançamento...' onChange={(e) => setReleaseData(Number(e.target.value))}></input>
        <button onClick={onSubmitMovie}>Adicionar Filme</button>

        <h2>Lista de Filmes que outros usuários adicionaram</h2>
        {movieList.map((movie) => (
            <div key={movie.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
            <h2>{movie.title}</h2>
            <p>Titulo: {movie.title}</p>
            <p>Ano de lançamento: {movie.releaseData}</p>
            </div>
        ))}
        
        </div>
    );
}

export default Movies;