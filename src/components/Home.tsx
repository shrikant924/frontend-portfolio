import axios from "axios";
import { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        const showData = async () => {
            console.log(await axios.get("http://localhost:8080/product/getProducts"))
        }
        showData()
    }, [] )
    return (
        <>
            <h1></h1>
        </>
    )
}

export default Home;