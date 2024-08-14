const { model, Schema } = require('mongoose');
const { hash, compare } = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator(val) {
        return /^\S+@\S+\.\S+$/.test(val);
      }
    }

  },
  password: {
    type: String,
    require: true,
    min: [6, 'Not Enough Characters']
  },

  autobots: [{
    type: Schema.Types.ObjectId,
    ref: 'Autobot'
  }],
}, {
  toJSON: {
    transform(user, jsonVal) {
      delete jsonVal.password;
      delete jsonVal.__v;


      return jsonVal;
    }
  }
});

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await hash(this.password, 10);
  }
});

userSchema.methods.validatePassword = async function (formPassword) {
  const is_valid = await compare(formPassword, this.password);
  return is_valid;
}

const User = model('User', userSchema);

module.exports = User;

