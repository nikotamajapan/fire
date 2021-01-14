import React,{useState} from 'react';
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
  const [users, setUsers]=useState([]);

  const handleClickFetchButton = async () => {
    const db = firebase.firestore();

    // コレクション取得
    const snapshot = await db
    .collection('users')
    .get();
    const _users= [];
    snapshot.forEach(doc => {
      _users.push({
        userId: doc.id,
        ...doc.data()
      });
    });

    setUsers(_users);
  };

  const userListItems = users.map(user=>{
    return(
      <li key={user.userID}>{user.name}:{user.age}:{user.location}</li>
    );
  })

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <p>ボタン押すとfirestoreの情報見れるよ</p>       
        <button onClick={handleClickFetchButton}>aaa</button>
        <ul>{userListItems}</ul>
        
        
    </div>
  );
}

export default App;
