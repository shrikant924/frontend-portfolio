import axios from "axios";
import { useEffect, useState } from "react";
import '../pages/css/Login.css'

const Dashboard = () => {
    let [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/posts/getAllMovies').then(
            response => {
                setMoviesData(response.data);
            }
        )

    }, [])

    useEffect(() => {
        // console.log("Movies fetched:", moviesData);
    }, [moviesData]);

    return (
        <div className="card-container">
            {
                moviesData.map((movie, index) => (
                    <div className="card">
                        <ul key={index}>
                            <img style={{ height: "200px", width:"300px" , borderRadius:"1em" }} src={"https://picsum.dev/300/200"}></img>
                            <li><strong>Movie name : </strong> {movie.name}</li>
                            <li><strong>Rating : </strong> {movie.rating}</li>
                            <li><strong>Collection :</strong> {movie.collection}</li>
                            <li><strong>Release date : </strong>{movie.release_date}</li>
                        </ul>
                    </div>
                ))
            }
        </div>)
}
export default Dashboard;