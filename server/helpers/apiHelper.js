import axios from 'axios';

class Http {
    get(path, cb) {
        return axios.get(`http://localhost:3030${path}`).then(res => {
            cb(res);
        });
    }

    post(path, data, cb) {
        return axios.post(`http://localhost:3030${path}`, data).then(res => {
            cb(res);
        });
    }
}

module.exports = Http;
