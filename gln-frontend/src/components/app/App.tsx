import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserAccountPage from '../user/UserAccountPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="https://globalline.my/static/logo.png" width="200" />
      </header>
      <main>
        <UserAccountPage />
      </main>
    </div>
  );
}

export default App;
