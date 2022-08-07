const { User, Thought} = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  //get single thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  //create new thought
  createThought({ body }, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id." });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  //update thought by ID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id.' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },
  //delete thought by ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err))
  },
  //create reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  },
  //delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: {reactionId: params.reactionId }}},
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;