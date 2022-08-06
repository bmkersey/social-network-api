const { Schema, model} = require('mongoose');


const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: 'You must enter a User Name!',
    trim: true
  },
  email: {
      type: String,
      unique: true,
      required: "You must enter an email address!",
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]  
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// virtual for friend count
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;