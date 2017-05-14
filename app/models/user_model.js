import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  username: String,
});

UserSchema.set('toJSON', {
  virtuals: true,
});

const bcrypt = require('bcryptjs');


UserSchema.pre('save', function beforeYourModelSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    return callback(null, isMatch);
  });
};

// create PostModel class from schema
const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
