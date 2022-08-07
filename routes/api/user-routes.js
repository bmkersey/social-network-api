const router = require('express').Router();
const { getAllUsers,getUserById,createUser,updateUser,deleteUser,addFriend,deleteFriend } = require('../../controllers/user-controller');

// endpoint /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// endpoint /api/user/<userID>
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//end  point /api/user/<userId>/<friendId>
router 
  .route('/:userId/:friendId')
  .post(addFriend)
  .delete(deleteFriend)

  module.exports = router
