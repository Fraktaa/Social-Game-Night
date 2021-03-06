// CUSTOM DECK PAGE VIEW ALL CARDS
import React, { useState, useEffect } from 'react';

import PlayingCard from '../common/PlayingCard.jsx';

import { useGame } from "../../../firebase/contexts/GameContext.js";

// MUI
// Styles
import { styled } from '@mui/material/styles';
// Layout
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// Inputs
import Button from '@mui/material/Button';
// Data Display
import Typography from '@mui/material/Typography';
// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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
    <Box
      maxWidth="sm"
    >
      {/* <Typography>all cards in pack</Typography> */}
      {/* <Typography onClick={() => (setPageView('CustomDeck'))}>back to custom deck page</Typography> */}
      <Typography variant="h3">{deckName}</Typography>
      <Stack direction="row" spacing={2}
      >
        <Container
          sx={{
            width: '120%',
          }}
        >
          <Typography>Adjective</Typography>
          <Typography>{deck.greenCard.length}<ContentCopyIcon /></Typography>
          <Stack direction="column" spacing={2}
            sx={{
              height: '100vh',
              width: '110%',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            {deck.greenCard.length > 0
              ?
              deck.greenCard.map((question, key) => (
                <Box key={key}>
                  <Typography onClick={() => (deletecard(currentUserUID, customDeckTitle, { label: question.label, extra: question.extra, sets: question.sets }, 'green'))}><DeleteIcon /></Typography>
                  <PlayingCard color="green" card={{
                    label: question.label,
                    extra: question.extra,
                    sets: question.sets,
                  }} />
                </Box>
              ))
              :
              <Box>
                <DeleteIcon />
                <PlayingCard color="green" card={{
                  label: 'adjective',
                  extra: '(synonyms) ',
                  sets: 'deck title',
                }} />
              </Box>
            }
          </Stack>
        </Container>
        <Container
          sx={{
            width: '120%',
          }}
        >
          <Typography>Noun</Typography>
          <Typography>{(deck.redCard).length}<ContentCopyIcon /></Typography>
          <Stack direction="column" spacing={2}
            sx={{
              height: '100vh',
              width: '110%',
              overflow: 'auto',
              position: 'relative',
            }}
          >
            {deck.redCard.length > 0
              ?
              deck.redCard.map((answer, key) => (
                <Box key={key}>
                  <Typography onClick={() => (deletecard(currentUserUID, customDeckTitle, { label: answer.label, extra: answer.extra, sets: answer.sets }, 'red'))}><DeleteIcon /></Typography>
                  <PlayingCard color="red" card={{
                    label: answer.label,
                    extra: answer.extra,
                    sets: answer.sets,
                  }} />
                </Box>
              ))
              :
              <Box>
                <DeleteIcon />
                <PlayingCard color="red" card={{
                  label: 'noun',
                  extra: 'sentence',
                  sets: 'deck title',
                }} />
              </Box>
            }
          </Stack>
        </Container>
      </Stack>
    </Box>
  )
}