import React from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyDLwIal6QUyU6G3dp6MCkZQzZfSbO8GMvk",
  authDomain: "test3-91199.firebaseapp.com",
  projectId: "test3-91199",
  storageBucket: "test3-91199.appspot.com",
  messagingSenderId: "754636685483",
  appId: "1:754636685483:web:8a5b081f619baf6c04f7ee",
  measurementId: "G-HJ6FRRB97H"
};
firebase.initializeApp(firebaseConfig);


function App() {
  const handleClickFetchButton =() =>{
    const db = firebase.firestore();
    db.collection('users').doc('8QdSeumAbMUysOhpO0ZZ').get().then((doc)=>{
      console.log('Document data:', doc.data());
    });

    console.log('fetch clicked');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit and save to reload.123
        </p>
        <button onClick={handleClickFetchButton}>aaa
        </button>
        
      </header>
    </div>
  );
}

export default App;
