import React from 'react';
import firebase  from 'firebase';
import logo from './logo.svg';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyDbGGto5FBBf-Sb2MuIEFlFJY8Fsw6_8OE",
  authDomain: "test2-10911.firebaseapp.com",
  projectId: "test2-10911",
  storageBucket: "test2-10911.appspot.com",
  messagingSenderId: "823756589849",
  appId: "1:823756589849:web:2763a9019b6860c7c5d388",
  measurementId: "G-QC3M8FT7MV"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function App() {
  const handleClickFetchButton = () => {
    const db = firebase.firestore();
    db.collection('users').doc('XOZ4cadUKYQMHtkOj5YZ').get().then((doc)=>{
      console.log('Document data:', doc.data());

    });

    console.log('fetch clicked');
  };

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          nd save to reload.123
        </p>
        
        <button onClick={handleClickFetchButton}>aaa</button>
        
    </div>
  );
}

export default App;
