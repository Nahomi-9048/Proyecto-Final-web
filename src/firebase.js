import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBnubT00mnjYX-5kOQGQcah45roR6eC41g",
  authDomain: "proyectomurointeractivo.firebaseapp.com",
  databaseURL: "https://proyectomurointeractivo-default-rtdb.firebaseio.com",
  projectId: "proyectomurointeractivo",
  storageBucket: "proyectomurointeractivo.appspot.com",
  messagingSenderId: "651657436579",
  appId: "1:651657436579:web:8699c2abd1ef38e3ab8e16"
  };
  // Initialize Firebase
  var fireDB=firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();