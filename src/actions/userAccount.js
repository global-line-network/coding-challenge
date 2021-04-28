import {
    CREATE_USER,
    RETRIEVE_USERS,
    DELETE_USER,
    UPDATE_USER,
    RETRIEVE_TOTAL_PAGES
} from './type';

import UserAccountService from '../services/UserAccountSevice';

export const createUser = (name, job) => async(dispatch) => {
    try {
        const res = await UserAccountService.create({name, job});
        
        dispatch({
            type: CREATE_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
};

export const retrieveTotalPages = () => async(dispatch) => {
    try {
        const res = await UserAccountService.getTotalPages();

        dispatch({
            type: RETRIEVE_TOTAL_PAGES,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
};

export const retrieveUsers = (page) => async(dispatch) => {
    try {
        const res = await UserAccountService.getAll(page);

        dispatch({
            type: RETRIEVE_USERS,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateUser = (id, data) => async(dispatch) =>  {
    try {
        const res = await UserAccountService.update(id, data);

        dispatch({
            type: UPDATE_USER,
            payload: data,
        });

        return Promise.resolve(res.data);

    }catch (error) {
        return Promise.reject(error);
    }
};

export const deleteUser = (id) => async(dispatch) => {
    try{
        const res = await UserAccountService.remove(id);

        dispatch({
            type: DELETE_USER,
            payload: { id },
        });

        return Promise.resolve(res.data);

    }catch (error) {
        return Promise.reject(error);
    }
};