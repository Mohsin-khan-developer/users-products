import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    address: {
        type: String,
    },
    contactInfo: {
        type: String,
    }
});

// const User = model.userdata|| model('userdata', userSchema);
let User;

try {
  User = model('userdata');
} catch (error) {
  User = model('userdata', userSchema);
}


export default User;

