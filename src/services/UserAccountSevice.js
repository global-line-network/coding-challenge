import http from '../http.common';

const getTotalPages = () => {
    return http.get();
}

const getAll = page => {
    return http.get(`?page=${page}`);
}

const get = id => {
    return http.get(`${id}`);
}

const create = data => {
    return http.post(data);
};

const update = (id, data) => {
    return http.put(`${id}`, data);
};

const remove = id => {
    return http.delete(`${id}`);
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
