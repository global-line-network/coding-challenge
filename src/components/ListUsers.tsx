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
                    <div className="d-flex align-items-center p-2 mt-2 mb-2" style={{border: "1px solid gray", borderRadius: "10px"}}>
                        <div className="image">
                            <img src={user.avatar} className="rounded-circle" width="155" /> 
                        </div>
                        <div className="ml-3 w-100">
                            <h4 className="mb-0 mt-0">{user.first_name + " " +user.last_name}</h4> 
                            <span>{user.email}</span>
                        </div>
                        <div className="button d-flex flex-column align-items-center"> 
                            <button className="btn btn-sm w-100 m-2">
                                <svg height="30px" viewBox="0 0 480 480" width="30px" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m240 0c-132.546875 0-240 107.453125-240 240s107.453125 240 240 240 240-107.453125 240-240c-.148438-132.484375-107.515625-239.851562-240-240zm0 464c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.140625 123.652344-100.347656 223.859375-224 224zm0 0"/><path d="m336 328h-127.433594l111.601563-111.601562 11.3125-11.308594c15.503906-15.640625 15.449219-40.875-.125-56.445313-15.570313-15.574219-40.804688-15.628906-56.445313-.125l-11.308594 11.3125-113.136718 113.136719-.074219.09375c-.640625.679688-1.160156 1.464844-1.535156 2.320312-.09375.226563-.160157.441407-.238281.664063-.128907.300781-.238282.609375-.328126.921875l-12.121093 57.375c-.078125.453125-.113281.910156-.113281 1.367188 0 .105468-.054688.183593-.054688.289062v.121094c.023438.925781.207031 1.839844.542969 2.703125.082031.199219.160156.382812.257812.574219.367188.828124.878907 1.585937 1.503907 2.242187 1.507812 1.515625 3.558593 2.367187 5.695312 2.359375h192c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm-150.71875-8.894531-30.882812 6.496093 6.53125-30.914062 12.191406 12.191406zm100.941406-159.273438c9.503906-9.054687 24.441406-9.054687 33.945313 0 9.375 9.371094 9.375 24.570313 0 33.945313l-5.664063 5.65625-33.9375-33.9375zm-16.964844 16.96875 16.964844 16.96875 16.976563 16.972657-101.832031 101.824218-16.96875-16.964844-16.964844-16.976562zm0 0"/>
                                </svg>
                            </button> 
                            <button className="btn btn-sm w-100 m-2">
                                <svg id="Layer_1" height="30px" viewBox="0 0 150 150" width="30px" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1">
                                    <path d="m98.835 139h-47.67a13.048 13.048 0 0 1 -12.965-12.064l-6.275-86.936h86.15l-.075 1.072-6.2 85.864a13.048 13.048 0 0 1 -12.965 12.064zm-58.642-12.208a11.042 11.042 0 0 0 10.972 10.208h47.67a11.042 11.042 0 0 0 10.972-10.208l6.118-84.792h-81.85z"/><path d="m92 25h-34v-9a5.006 5.006 0 0 1 5-5h24a5.006 5.006 0 0 1 5 5zm-32-2h30v-7a3 3 0 0 0 -3-3h-24a3 3 0 0 0 -3 3z"/><path d="m120 42h-90a5.006 5.006 0 0 1 -5-5v-9a5.006 5.006 0 0 1 5-5h90a5.006 5.006 0 0 1 5 5v9a5.006 5.006 0 0 1 -5 5zm-90-17a3 3 0 0 0 -3 3v9a3 3 0 0 0 3 3h90a3 3 0 0 0 3-3v-9a3 3 0 0 0 -3-3z"/><path d="m56 119.5a1 1 0 0 1 -1-1v-58a1 1 0 0 1 2 0v58a1 1 0 0 1 -1 1z"/><path d="m75 119.5a1 1 0 0 1 -1-1v-58a1 1 0 0 1 2 0v58a1 1 0 0 1 -1 1z"/><path d="m94 119.5a1 1 0 0 1 -1-1v-58a1 1 0 0 1 2 0v58a1 1 0 0 1 -1 1z"/>
                                </svg>
                            </button> 
                        </div>
                    </div>
                </div>
              ))}
          </div>
        }
        </>
    );
}