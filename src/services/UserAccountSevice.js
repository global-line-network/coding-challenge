import http from '../http.common';

const getTotalPages = () => {
    return http.get();
}

const getAll = page => {
    return http.get(`/api/users/?page=${page}`);
}

const get = id => {
    return http.get(`/api/users/${id}`);
}

const create = data => {
    return http.post("/api/users", data);
};

const update = (id, data) => {
    return http.put(`/api/users/${id}`, data);
};

const remove = id => {
    return http.delete(`/api/users/${id}`);
}


const UserAccountService = {
    getTotalPages,
    getAll,
    get,
    create,
    update,
    remove
  };
  
  export default UserAccountService;
