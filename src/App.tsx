import React from 'react';
import CreateUser from './components/AddUser';
import ListUser from './components/ListUsers';

export default function App() {
    return(
        <div className="container mt-4 mb-4">
            <div className="pt-2 pb-2">
                <img src="https://globalline.my/static/logo.png" width="200" alt="logo"/>
            </div>
            <div className="pt-2 pb-2">
                <h1>User Accounts</h1>
            </div>
            <div className="pt-2 pb-2">
                <CreateUser />
            </div>
            <div className="pt-2 pb-2">
                <ListUser />
            </div>
            
        </div>
    )
}