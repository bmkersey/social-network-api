const router = require('express').Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought,createReaction, deleteReaction} = require('../../controllers/thought-controller');

//endpoint api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought)

//endpoint api/thoughts/<thoughtID>
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought)

//endpoint api/thoughts/<thoughtID>/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)

//endpoint api/thoughts/<thoughtID>/reactions/<reactionID>
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)


  module.exports = router;