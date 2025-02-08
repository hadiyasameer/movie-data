import React,{useEffect,useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

const MovieCard=({movie})=>{
    return(
        <div className='col-lg-3 col-md-4 col-sm-6 my-4'>
            <div className="card">
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title} className="card-img-top"/>
                <div className="card-body">
                    <h5 className='card-title'>{movie.title}</h5>
                    <p className='card-text'>{movie.overview}</p>
                </div>
            </div>
        </div>
    );
};

function MovieList() {
    const [movies, setMovies]=useState([]);
    useEffect(()=>{
        const fetchMovies=async () =>{
            try{
                const response=await axios.get(
                    "https://api.themoviedb.org/3/movie/now_playing",
                    {
                        params:{
                            api_key:"e0293fb2765458e12d34843301081d91",
                        },
                    }
                );
                console.log(response.data.results);
                setMovies(response.data.results);
            }catch(error){
                console.log("Error fetching data:",error);
            }
        };
        fetchMovies();
    },[]);

  return (
    <div className='container'>
        <div className="row">
            {movies.map((movie)=>{
                return(
                <MovieCard key={movie.id} movie={movie}/>)
            })}
        </div>

    </div>
  )
}

export default MovieList