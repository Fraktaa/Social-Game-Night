import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import ViewCards from './ViewCards.jsx'


export default function Custom({ gameState, selectedCustomDeck, setPageView, customDeckTitle, setCustomDecktitle, previousView }) {
  const [customAnswer, setCustomAnswer] = useState('');
  const [editTitle, setEditTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [cardTypeCust, setCardTypeCust] = useState('QUESTION')
  const [newCard, setNewCard] = useState('');
  const [createButton, setCreateButton] = useState(false);

  // {
  //   answers: [],
  //   questions: [],
  // }

  const editTitleFunc = () => (
    !editTitle
      ?
      <Box>
        {customDeckTitle.length <= 0
          ?
          <Typography variant="h4">
            <Box sx={{ fontStyle: 'italic', m: 1 }}>Title</Box></Typography>
          : <Typography variant="h4">{customDeckTitle}</Typography>}
        <Button variant="outlined" onClick={() => (setEditTitle(true))}>edit</Button>
      </Box>
      :
      <Box>
        <TextField
          required
          id="outlined-required"
          label="Deck Title"
          defaultValue={customDeckTitle}
          onChange={(e) => (
            setNewTitle(e.target.value)
          )}
        />
        <br></br>
        <Button variant="outlined" onClick={() => (setEditTitle(false), setCustomDecktitle(newTitle))}>save</Button>
      </Box>
  )

  const addCardFunc = () => (
    <Box>
      <Box>
        {cardTypeCust === 'QUESTION' ?
          <Stack direction="row" spacing={2}>
            <Button variant="contained">Question</Button>
            <Button variant="outlined" onClick={() => (setCardTypeCust('ANSWER'))}>Answer</Button>
          </Stack>
          :
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={() => (setCardTypeCust('QUESTION'))}>Question</Button>
            <Button variant="contained">
              Answer
            </Button>
          </Stack>
        }
      </Box>

      <Box>
        {createButton
          ?
          <>
            <div>{newCard}</div>
            <div>created!</div>
          </>
          :
          <>
            <TextField
              required
              id="outlined-required"
              label={"NEW " + cardTypeCust}
              defaultValue=""
              onChange={(e) => (
                setNewCard(e.target.value)
              )}
            />
            <br></br>
            <Button variant="" onClick={() => (
              newCard.length > 0 ? (createCard(cardTypeCust, newCard),
                setCreateButton(true)) : null
            )}>create card <AddIcon /></Button>
          </>
        }
      </Box>

    </Box>
  )

  const createCard = (type, message) => {
    // put request to add specific card to users deck depending on what cardtype it is
  }

  return (
    <Container>
      <Button variant="outlined" onClick={() => (setPageView(`${previousView}`), setCustomDecktitle(''))}>back to {previousView} page</Button>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <Typography variant="h3">custom cards</Typography>
            <Paper elevation={(5)}>
              {editTitleFunc()}
              {addCardFunc()}
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <ViewCards gameState={gameState} setPageView={setPageView} selectedCustomDeck={selectedCustomDeck} customDeckTitle={customDeckTitle} setCustomDecktitle={setCustomDecktitle} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}