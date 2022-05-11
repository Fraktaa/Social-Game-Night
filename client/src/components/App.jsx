import React, { useState, useEffect } from "react";
import { useAuth } from "../firebase/contexts/AuthContext.js";
import { auth } from "../firebase/firebase.js";
import { useGame } from "../firebase/contexts/GameContext.js";
import SignUpPage from "./views/signup/SignUp.jsx";
import SignInPage from "./views/signin/SignIn.jsx";
import Navbar from "./views/navbar/Navbar.jsx";
import HomePage from "./views/homepage/HomePage.jsx";
import JudgeView from "./views/judgeview/JudgeView.jsx";
import PlayerView from "./views/playerview/PlayerView.jsx";
import Lobby from "./views/lobby/Lobby.jsx";
import LobbyRestyle from "./views/lobby/LobbyRestyle.jsx";
import CustomDeck from "./views/customdeck/CustomDeck.jsx";
import { AvatarChipWaiting, AvatarChipPicking } from "./views/common/AvatarChips.jsx";
import Custom from "./views/customdeck/Custom.jsx";
import ViewCards from "./views/customdeck/ViewCards.jsx";
import PlayingCard from "./views/common/PlayingCard.jsx";
import Results from "./views/results/Results.jsx";
import { io } from "socket.io-client";
const socket = io();

const customDecksSample = {
  skips: {
    questions: [
      {
        label: 'skiplabel1',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default green',
      },
      {
        label: '2some prompt',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default green',
      },
      {
        label: '3some prompt',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default green',
      },],
    answers: [
      {
        label: '1Absurd',
        extra: '1(ridiculous, senseless, foolish) ',
        sets: '1default red',
      },
      {
        label: '2Abundant',
        extra: '2(plentiful, ample, numerous) ',
        sets: '2default red',
      },
      {
        label: '3Addictive',
        extra: '3(obsessive, consuming, captivating) ',
        sets: '3default red',
      },
      {
        label: '4Absurd',
        extra: '4(ridiculous, senseless, foolish) ',
        sets: '4default red',
      },
      {
        label: '5bundant',
        extra: '5(plentiful, ample, numerous) ',
        sets: '5default red',
      },
      {
        label: 'Addictive',
        extra: '(obsessive, consuming, captivating) ',
        sets: 'default red',
      },]
  },
}

const customUserInfo = {
  name: "Raymond",
  title: "The Wise",
  avatar:
    "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
};

const dummyWinner = [
  {
    name: "Nathaniel",
    title: "The Brave",
    avatar:
      "https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png",
  }
];

const dummyWinners = [
  {
    name: "Nathaniel",
    title: "The Brave",
    avatar:
      "https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png",
  },
  {
    name: "Raymond",
    title: "The Wise",
    avatar:
      "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
  }
];

export default function App() {
  const { signUp, currentUser, setCurrentUser } = useAuth();
  const { getUser, getDeck } = useGame();
  const [pageView, setPageView] = useState('HomePage');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [gameState, setGameState] = useState({});
  const [defaultDeck, setDefaultDeck] = useState(customDecksSample.skip);
  const [customDecks, setCustomDecks] = useState(customDecksSample);
  const [selectedCustomDeck, setSelectedCustomDeck] = useState({
    dummy: {
      questions: [
        {
          label: 'some prompt',
          extra: '(obsessive, consuming, captivating) ',
          sets: 'default green',
        }],
      answers: [
        {
          label: 'Addictive',
          extra: '(obsessive, consuming, captivating) ',
          sets: 'default red',
        }]
    },
  });
  const [customDeckTitle, setCustomDecktitle] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { user: "Bot", text: "This is the beginning of the chat history" },
  ]);
  const [name, setName] = useState("MrJoel");
  const [host, setHost] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState([
    // {
    //   name: "Nathaniel",
    //   title: "The Brave",
    //   avatar:
    //     "https://www.kindpng.com/picc/m/3-35984_transparent-emotion-clipart-transparent-background-happy-emoji-png.png",
    // },
    // {
    //   name: "Raymond",
    //   title: "The Wise",
    //   avatar:
    //     "https://upload.wikimedia.org/wikipedia/en/2/2d/SSU_Kirby_artwork.png",
    // },
    // {
    //   name: "Matthew",
    //   title: "The Hell Raiser",
    //   avatar:
    //     "https://mpng.subpng.com/20180624/zyt/kisspng-magic-rush-heroes-wikia-character-western-restaurants-5b2fccfed0dfb9.9185671315298593268556.jpg",
    // },
    // {
    //   name: "Kim",
    //   title: "The Wizard",
    //   avatar:
    //     "https://w7.pngwing.com/pngs/525/864/png-transparent-wizard-holding-staff-dungeons-dragons-pathfinder-roleplaying-game-d20-system-wizard-magician-wizard-cartoon-d20-system-wizard-thumbnail.png",
    // },
  ]);

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    if(currentUser) {
      console.log("currentUser Name: ", currentUser.name);
      console.log("currentUser ID: ", currentUser.UID);
    }
  }, [currentUser]);

  socket.on("new game", (gameObj) => {
    console.log('newGame!!')
    gameObj = JSON.parse(gameObj);
    setGameState(gameObj);
  });

  socket.on('join game', (msg) => {
    console.log('new player entered room')
    msg = JSON.parse(msg);
    console.log(msg)
    setConnectedUsers([...connectedUsers, msg.user])
  })

  socket.on("game action", (gameObj) => {
    console.log('gameAction received');
    gameObj = JSON.parse(gameObj);
    setGameState(gameObj);
  });

  function handleLogState() {
    if (isLoggedIn) {
      auth
        .signOut()
        .then(() => {
          setIsLoggedIn(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    console.log('calling get deck');
    getDeck('default', 'default')
      .then((deck) => {
        console.log('deck', deck);
        if (deck.greenCard) {
          deck['questions'] = deck['greenCard'];
          deck['answers'] = deck['redCard'];
          delete deck['greenCard'];
          delete deck['redCard'];
        }
        setDefaultDeck(deck);
      })
      .catch((e) => console.log(e));
  }, [isLoggedIn]);

  var handleViewClick = (view) => {
    // e.preventDefault();
    setPageView(view);
  };

  if (!isLoggedIn) {
    return (
      <>
        {pageView === "SignUp" ? (
          <SignUpPage
            handleLogState={handleLogState}
            gameState={gameState}
            setPageView={setPageView}
          />
        ) : null}
        {pageView === "SignIn" ? (
          <SignInPage
            handleLogState={handleLogState}
            gameState={gameState}
            setPageView={setPageView}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <Navbar handleViewClick={handleViewClick} />
      {/* <button onClick={handleViewClick} value='SignUp'>SignUp</button>
      <button onClick={handleViewClick} value='SignIn'>SignIn</button>
      <button onClick={handleViewClick} value='HomePage'>HomePage</button>
      <button onClick={handleViewClick} value='JudgeView'>JudgeView</button>
      <button onClick={handleViewClick} value='PlayerView'>PlayerView</button>
      <button onClick={handleViewClick} value='Lobby'>Lobby</button>
      <button onClick={handleViewClick} value='LobbyRestyle'>LobbyRestyle</button>
      <button onClick={handleViewClick} value='CustomDeck'>CustomDeck</button>
      <button onClick={handleViewClick} value='avatarExample'>avatarExample</button>
      <button onClick={handleViewClick} value='results'>results</button> */}
      {pageView === "HomePage" ? (
        <HomePage
          gameState={gameState}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleLogState={handleLogState}
          setPageView={setPageView}
          connectedUsers={connectedUsers}
          setConnectedUsers={setConnectedUsers}
        />
      ) : null}
      {pageView === "JudgeView" ? (
        <JudgeView
          gameState={gameState}
          setPageView={setPageView}
        />
      ) : null}
      {pageView === "PlayerView" ? (
        <PlayerView
          gameState={gameState}
          setPageView={setPageView}
          customDecksSample={customDecksSample}
          connectedUsers={connectedUsers}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          currentUser={currentUser}
        />
      ) : null}
      {pageView === "Lobby" ? (
        <Lobby
          gameState={gameState}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          name={name}
          host={host}
          connectedUsers={connectedUsers}
          setPageView={setPageView}
          customDecks={customDecks}
          defaultDeck={defaultDeck}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "LobbyRestyle" ? (
        <LobbyRestyle
          gameState={gameState}
          chatHistory={chatHistory}
          setChatHistory={setChatHistory}
          name={name}
          host={host}
          connectedUsers={connectedUsers}
          setPageView={setPageView}
          customDecks={customDecks}
          defaultDeck={defaultDeck}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "CustomDeck" ? (
        <CustomDeck
          gameState={gameState}
          setPageView={setPageView}
          customDecks={customDecks}
          setSelectedCustomDeck={setSelectedCustomDeck}
          setCustomDecktitle={setCustomDecktitle}
        />
      ) : null}
      {pageView === "Custom" ? (
        <Custom
          gameState={gameState}
          setPageView={setPageView}
          previousView={"Lobby"}
          selectedCustomDeck={selectedCustomDeck}
          customDeckTitle={customDeckTitle}
          setCustomDecktitle={setCustomDecktitle}
          currentUserUID={currentUser.UID}
        />
      ) : null}
      {pageView === "ViewCards" ? (
        <ViewCards
          gameState={gameState}
          setPageView={setPageView}
          selectedCustomDeck={selectedCustomDeck}
          customDeckTitle={customDeckTitle}
          setCustomDecktitle={setCustomDecktitle}
          currentUserUID={currentUser.UID}
        />
      ) : null}
      {pageView === "avatarExample" ? (
        <div>
          <AvatarChipPicking picking={true} user={customUserInfo} />
          <br />
          <AvatarChipPicking picking={false} user={customUserInfo} />
          <br />
          <AvatarChipWaiting user={customUserInfo} />
          <br />
          <PlayingCard card={customDecksSample.skips.questions[0]} color='green' />
          <br />
          <PlayingCard card={customDecksSample.skips.answers[0]} color='red' />
        </div>
      ) : null}
      {pageView === "results" ? (
        <Results gameState={gameState} setPageView={setPageView} winner={dummyWinners} chatHistory={chatHistory} setChatHistory={setChatHistory} />
      ) : null}
    </>
  );
}
