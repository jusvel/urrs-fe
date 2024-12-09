import './ReviewModal.css';
import { Box, Button, Modal, Rating, TextareaAutosize, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { createReview } from '../../../api/reviewsApi.ts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 500,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexDirection: 'column',
  display: 'flex',
};

export default function ReviewModal({ reviewModalOpen, setReviewModalOpen, currentEventId }) {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  const createReviewForEvent = () => {
    createReview(currentEventId, reviewText, rating);
    setReviewModalOpen(false);
  };

  const closeModal = () => {
    setReviewText("")
    setRating(1)
    setReviewModalOpen(false);
  }

  return <Modal
    open={reviewModalOpen}
    onClose={closeModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Palikite atsiliepimą šiam renginiui
      </Typography>
      <TextField
        multiline
        rows={7}
        sx={{ mt: 2 }}
        id="outlined-controlled"
        label="Komentaras"
        value={reviewText}
        onChange={(event) => {
          setReviewText(event.target.value);
        }}
      />
      <Rating
        sx={{
          mt: 2, '& .MuiRating-icon': {
            fontSize: '40px', // Adjust the size as needed
          },
        }}
        name="simple-controlled"
        size="large"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={createReviewForEvent}
      >
        Palikti atsiliepimą
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={closeModal}
      >
        Uždaryti
      </Button>
    </Box>
  </Modal>;
}
