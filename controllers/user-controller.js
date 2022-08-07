const { User, Thought } = require('../models');

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  //get one user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },
  //post new user
  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  },
  //put update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId }, 
      body, 
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  //delete remove user by ID BONUS: remove users thoughts when deleted.
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
    //BONUS : remover users thoughts when deleted, this is completed in the line below. Once we have found
    // and deleted the user, we then take that user and find all thoughts by that user and delete them.
    .then(dbUserData => Thought.remove({ _id: {$in: dbUserData.thoughts }}))
    .then(res.status(200).json('User and all associated thoughts deleted.'))
    .catch(err => res.json(err))
  },
  //add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId},
      {$addToSet: { friends: params.friendId }},
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with specified ID!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  //remove friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
  }
};

module.exports = userController;