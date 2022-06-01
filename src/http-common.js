import axios from "axios";

export default axios.create({
    baseURL: "https://dark-thought.herokuapp.com/api",
    //baseURL: "http://localhost:5044/api",
    headers: {
        "content-type": "application/json"
    }
});