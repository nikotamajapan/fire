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
  const [userName, setUserName]=useState('');
  const [age, setAge]=useState('');

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
    if (!userName || !age){
      alert('"userName"or"age"が空です');
      return;

    }
    const parsedAge = parseInt(age, 10);

    if (isNaN(parsedAge)){
      alert('number has to be number');
      return;
    }
    const db = firebase.firestore();
    // await db 
    //   .collection('users')
    //   .doc('1111')
    //   .set({
    //     // name:'DUMMY',
    //     age:66,
    //   },{merge: true});

    // add
    await db.collection('users').add({
      name:userName,
      age:parsedAge,
    });
    // const snapshot = await ref.get();
    // const data =  snapshot.data();
    // console.log(ref.id, data);

    setUserName('');
    setAge('');
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

        <label htmlFor="username">userName :  </label>  
        <input 
        type='text'
        id='username'
        value={userName}
        onChange={(event) =>{setUserName(event.target.value)}}
        />
        <label htmlFor="age">age :  </label>  
        <input 
        type='text'
        id='age'
        value={age}
        onChange={(event) =>{setAge(event.target.value)}}
        />
        
        <button onClick={handleClickFetchButton}>fetch</button>
        <button onClick={handleClickAddButton}>add</button>
        <ul>{userListItems}</ul>

        
    </div>
  );
}

export default App;
