import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { IUser, UserRole } from '@micro-school/interfaces';

// scrypt is callback based so with promisify we can await it
const scryptAsync = promisify(scrypt);

export class UserEntity implements IUser {
  _id?: string;
  displayName?: string;
  email: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    Object.assign(this, user);
  }

  public async setPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const passwordHash = (await scryptAsync(password, salt, 64)) as Buffer;
    this.passwordHash = passwordHash.toString();
    return this;
  }
}

// == Stackoverflow ==
// export class Password {
//   static async toHash(password: string) {
//     const salt = randomBytes(8).toString("hex");
//     const buf = (await scryptAsync(password, salt, 64)) as Buffer;
//     return `${buf.toString("hex")}.${salt}`;
//   }
//   static async compare(storedPassword: string, suppliedPassword: string) {
//    // split() returns array
//     const [hashedPassword, salt] = storedPassword.split(".");
//    // we hash the new sign-in password
//     const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
//    // compare the new supplied password with the stored hashed password
//     return buf.toString("hex") === hashedPassword;
//   }
// }

// == Geeksforgeeks ==
// const mongoose = require('mongoose');
// var crypto = require('crypto');

// // Creating user schema
// const UserSchema = mongoose.Schema({
//     name : {
//         type : String,
//         required : true
//     },
//     email : {
//         type : String,
//         required : true
//     },
//     hash : String,
//     salt : String
// });

// // Method to set salt and hash the password for a user
// // setPassword method first creates a salt unique for every user
// // then it hashes the salt with user password and creates a hash
// // this hash is stored in the database as user password
// UserSchema.methods.setPassword = function(password) {

//  // Creating a unique salt for a particular user
//     this.salt = crypto.randomBytes(16).toString('hex');

//     // Hashing user's salt and password with 1000 iterations,
//     64 length and sha512 digest
//     this.hash = crypto.pbkdf2Sync(password, this.salt,
//     1000, 64, `sha512`).toString(`hex`);
// };

// // Method to check the entered password is correct or not
// // valid password method checks whether the user
// // password is correct or not
// // It takes the user password from the request
// // and salt from user database entry
// // It then hashes user password and salt
// // then checks if this generated hash is equal
// // to user's hash in the database or not
// // If the user's hash is equal to generated hash
// // then the password is correct otherwise not
// UserSchema.methods.validPassword = function(password) {
//     var .hash = crypto.pbkdf2Sync(password,
//     this.salt, 1000, 64, `sha512`).toString(`hex`);
//     return this.hash === hash;
// };

// // Exporting module to allow it to be imported in other files
// const User = module.exports = mongoose.model('User', UserSchema);
