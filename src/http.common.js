import axios from 'axios';

export default axios.create({
    baseURL: "https://reqres.in/api/users/",
    headers: {
        "Content-type": "application/json"
    }
})