import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase.js';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';

const GameContext = React.createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  function getUser(currentUserID) {
    return getDoc(doc(db, 'users', currentUserID))
      // .then((client) => {
      //   setCurrentUser(client.data());
      // })
      .catch((err) => {
        // console.log(err);
        throw err;
      })
  }

  function getDeck(deck) {
    let redContainer = [];
    let greenContainer = [];

    getDocs(collection(db, 'defaultRed'))
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          redContainer.push(doc.data());
        });

        return getDocs(collection(db, 'defaultGreen'));
      })
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          greenContainer.push(doc.data());
        });
      })
      .then(() => {
        return {
          questions: redContainer,
          answers: greenContainer
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addCustomDeck(redDeck, greenDeck, deckName) {
    greenDeck.forEach((card) => {
      addDoc(collection(db, deckName + ' green'), {
        label: card.label,
        extra: card.extra,
        sets: card.sets
      })
        .catch(e => {
          console.error('Error adding document: ', e);
        });
    });

    redDeck.forEach((card) => {
      addDoc(collection(db, deckName + ' red'), {
        label: card.label,
        extra: card.extra,
        sets: card.sets
      })
        .catch(e => {
          console.error('Error adding document: ', e);
        });
    });
  }

  const value = {
    currentUser,
    setCurrentUser,
    getUser,
    getDeck,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}