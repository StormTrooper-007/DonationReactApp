import {createStore, combineReducers, compose} from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase'
import {reduxFirestore, firestoreReducer} from 'redux-firestore'

//Reducers
import notifyReducer from './reducers/notifyReducer'
import completedReducer from './reducers/completedReducer'


const firebaseConfig = {
    apiKey: "AIzaSyCeYIjXP7MxtD_yAOml4_uvhvntOEcoyPQ",
    authDomain: "reactapp-f3289.firebaseapp.com",
    databaseURL: "https://reactapp-f3289.firebaseio.com",
    projectId: "reactapp-f3289",
    storageBucket: "reactapp-f3289.appspot.com",
    messagingSenderId: "660691709862",
    appId: "1:660691709862:web:22447cf39f1e9e0b156967",
    measurementId: "G-6SM8HD25TY"
  };

  const rrfConfig = {
      userProfile:'users',
      useFirestoreForProfile: true
    }

  //Init firebase instance
  firebase.initializeApp(firebaseConfig)

  //Init firestore
  const firestore = firebase.firestore()
  
  //Add reactReduxFirebase enhancer when making store creator
  const createStoreWithFirebase = compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
  )(createStore)

  const rootReducer = combineReducers({
      firebase: firebaseReducer,
      firestore: firestoreReducer,
      notify: notifyReducer,
      completed: completedReducer
    })

    //create initial state

    const initialState = {

    }


  //Create store
  const store = createStoreWithFirebase(rootReducer, initialState, compose(
      reactReduxFirebase(firebase),
      window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

  export default store