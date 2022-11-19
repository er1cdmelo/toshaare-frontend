import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyACWcuysUdi7uYus6yXFGYK47vcs1FuqeI",
  authDomain: "toshaare.firebaseapp.com",
  projectId: "toshaare",
  storageBucket: "toshaare.appspot.com",
  messagingSenderId: "1021735003718",
  appId: "1:1021735003718:web:29c9dcf9a949189f1d4c47",
  measurementId: "G-N79RWXS9NV"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);