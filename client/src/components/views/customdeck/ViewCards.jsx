// CUSTOM DECK PAGE VIEW
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import PlayingCard from '../common/PlayingCard.jsx';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import { useGame } from "../../../firebase/contexts/GameContext.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ViewCards({
  gameState, setPageView, selectedCustomDeck, customDeckTitle, setCustomDeckTitle, currentUserUID,
  setDeletedCard,
  setPostCard,
  deletedCard,
  postCard
}) {
  const { removeFromCustomDeck, getDeck } = useGame();
  const decks = Object.keys(selectedCustomDeck);
  const deckName = decks[0]
  const [deck, setDeck] = useState(selectedCustomDeck[deckName])


  // resetting the deck after a post has been made
  useEffect(() => {
    setDeck(selectedCustomDeck[deckName])
  }, [selectedCustomDeck])


  const deletecard = (userId, deckName, card, color) => {
    removeFromCustomDeck(userId, deckName, card, color)
      .then(() => (
        setDeletedCard(true),
        console.log('card deleted')),
      )
      .then(() => (
        console.log('refreshing custom deck'),
        getDeck(deckName, userId)
          .then((getdeck) => {
            console.log('getting custom deck after card deleted')
            setDeck(getdeck)
          })
          .catch((e) => (
            console.log(e)
          ))
      ))
      .catch((e) => (console.log(e)));
  }

  return (
    <Container
      maxWidth="sm"
    >
      <Typography>AllCards in deck</Typography>
      <Typography onClick={() => (setPageView('CustomDeck'))}>back to custom deck page</Typography>
      <Typography variant="h1">{deckName}</Typography>
      <Typography>Questions</Typography>
      <Container>
        <Stack direction="row" spacing={2}>
          {deck.greenCard.length > 0
            ?
            deck.greenCard.map((question, key) => (
              <Container key={key}>
                <Typography onClick={() => (deletecard(currentUserUID, customDeckTitle, { label: question.label, extra: question.extra, sets: question.sets }, 'green'))}><DeleteIcon /></Typography>
                <Item >{question.label}</Item>
                <PlayingCard color="green" card={{
                  label: question.label,
                  extra: question.extra,
                  sets: question.sets,
                }} />
              </Container>
            ))
            :
            <PlayingCard color="green" card={{
              label: 'label',
              extra: 'extra',
              sets: 'sets',
            }} />
          }
        </Stack>
      </Container>
      <Typography>Answers</Typography>
      <Container>
        <Stack direction="row" spacing={2}>
          {deck.redCard.length > 0
            ?
            deck.redCard.map((answer, key) => (
              <Container key={key}>
                <Typography onClick={() => (deletecard(currentUserUID, customDeckTitle, { label: answer.label, extra: answer.extra, sets: answer.sets }, 'red'))}><DeleteIcon /></Typography>
                <Item>{answer.label}</Item>
                <PlayingCard color="red" card={{
                  label: answer.label,
                  extra: answer.extra,
                  sets: answer.sets,
                }} />
              </Container>
            ))
            :
            <PlayingCard color="red" card={{
              label: 'label',
              extra: 'extra',
              sets: 'sets',
            }} />
          }
        </Stack>
      </Container>
    </Container>
  )
}