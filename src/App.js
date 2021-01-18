import React, { useState, useEffect } from 'react';
import firebase  from 'firebase';
import logo from './logo.svg';
import './App.css';
// import { firestore } from 'firebase-admin';
const firebaseConfig = {
  apiKey: "AIzaSyDbGGto5FBBf-Sb2MuIEFlFJY8Fsw6_8OE",
  authDomain: "test2-10911.firebaseapp.com",
  projectId: "test2-10911",
  storageBucket: "test2-10911.appspot.com",
  messagingSenderId: "823756589849",
  appId: "1:823756589849:web:2763a9019b6860c7c5d388",
  measurementId: "G-QC3M8FT7MV"
};

firebase.initializeApp(firebaseConfig);

function App() {
  const [users, setUsers]=useState([]);
  const [userName, setUserName]=useState('');
  const [age, setAge]=useState('');
  const [documentId, setDocumentId]=useState('');

  useEffect(()=> {
    const db = firebase.firestore();
    const unsubscribe = db.collection('users').orderBy('age','asc').onSnapshot((querySnapshot)=> {
      const _users = querySnapshot.docs.map(doc => {
        return {
          userId: doc.id,
          ...doc.data()
        }
      });
      setUsers(_users);
    });
    return ()=>{
      unsubscribe();
    };
  }, []);

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
  };
  const handleClickUpdateButton = async () => {
    if (!documentId) {
      alert('documentId set!');
      return;
    }
    const newData = {};
    if (userName){
      newData['name'] = userName;
    }
    if (age) {
      newData['age'] = parseInt(age, 10);;
    }

    try{
      const db = firebase.firestore();
      await db.collection('users').doc(documentId).update(newData);
      setUserName('');
      setAge('');
      setDocumentId('');
    } catch (error){
      console.error(error);
    }

    // const db = firebase.firestore();
    // await db.collection('users').doc('c8QOdwfueqtutUMh0FAs').update({
    //   name:'new',
    //   age:555
    // });
  };
  const handleClickDeleteButton = async () => {
    if(!documentId) {
      alert('docmentId set!');
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection('users').doc(documentId).delete();
      setUserName('');
      setAge('');
      setDocumentId('');
    } catch(error){
      console.log(error);
    }
  };

  const userListItems = users.map(user => {
    return(
      <li key={user.userId}>
        <ul>
          <li>ID : {user.userId}</li>
          <li>name : {user.name}</li>
          <li>age : {user.age}</li>
        </ul>
      </li>        
    );
  });

  return (
    <div className="App">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>fetchボタン押すとfirestoreの情報見れるよ</p> 
        <p>addボタン押すと追加</p> 
        <p>pudateボタン押すと変更</p> 
        
        <div>
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
          <label htmlFor="documentId">documentId :  </label>  
          <input 
          type='text'
          id='documentId'
          value={documentId}
          onChange={(event) =>{setDocumentId(event.target.value)}}
          />          
        </div>

        <button onClick={handleClickFetchButton}>fetch</button>
        <button onClick={handleClickAddButton}>add</button>
        <button onClick={handleClickUpdateButton}>update</button>
        <button onClick={handleClickDeleteButton}>Delete</button>
        <ul>{userListItems}</ul>        
    </div>
  );
}

export default App;
