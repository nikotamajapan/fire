import React,{useState} from 'react';
import firebase  from 'firebase';
import logo from './logo.svg';
import './App.css';
import { firestore } from 'firebase-admin';

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
  const handleClickAddButton = async () => {
    // if (!userName || !age){
    //   SpeechRecognitionAlternative('"userName"or"age"が空です');
    //   return;

    // }
    // const parsedAge = parseInt(age, 10);

    // if (isNaN(parsedAge)){
    //   aleart('number has to be small letter');
    //   return;
    // }
    const db = firebase.firestore();
    await db 
      .collection('users')
      .doc('1111')
      .set({
        // name:'DUMMY',
        age:88,
      });

  }


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
        <button onClick={handleClickAddButton}>bbb</button>
        <ul>{userListItems}</ul>

        
    </div>
  );
}

export default App;
