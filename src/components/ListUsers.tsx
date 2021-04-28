import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers } from "../actions/userAccount";
import { RootState } from '../store';

export default function ListUsers() {
  const usersList = useSelector((state: RootState) => state.users.users.data);
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveUsers());
    }, []);

    return (
        <>
        {
          !usersList ?
          <h1>Empty list</h1>
          :
          <div className="row">
            {usersList.map((user:any, index:any) => (
                <div className="col-md-6" key={user.id}>
                    <div className="d-flex align-items-center pt-2 pb-2 m-3">
                        <div className="image">
                            <img src={user.avatar} className="rounded-circle" width="155" /> 
                        </div>
                        <div className="ml-3 w-100">
                            <h4 className="mb-0 mt-0">{user.first_name + user.last_name}</h4> 
                            <span>george.bluth@reqres.in</span>
                        </div>
                        <div className="button d-flex flex-column align-items-center"> 
                            <button className="btn btn-sm btn-outline-primary w-100 m-2">Chat</button> 
                            <button className="btn btn-sm btn-primary w-100 m-2">Follow</button> 
                        </div>
                    </div>
                </div>
              ))}
          </div>
        }
        </>
    );
}