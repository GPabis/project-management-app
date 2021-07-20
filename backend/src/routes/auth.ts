import User from "../models/user.model";
import express from 'express';
import connect from "../middleware/database";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';

const router = express.Router();

interface registerBody {
  email: string, 
  username: string, 
  password: string,
}

interface loginBody {
  email: string,
  password: string,
}

const findUserByEmail = async (email:string) => {
  const oldUser = await User.findOne({email});
  return oldUser ? oldUser : false;
}


router.post('/register', async (req,  res) => {

  try{

    const {email, username, password}: registerBody = req.body;

    if(!(email && username && password)){
      res.status(400).send('All input is required!');
    }

    await connect();

    const userExist = await findUserByEmail(email);

    if (userExist) return res.status(409).send("User Already Exist. Please Login");

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      username,
      password: encryptedPassword
    });

    const tokenKey = process.env.TOKEN_KEY;
    
    if(!tokenKey){
      return res.status(500).send('Server Problem - plesase try again later')
    }


    const token = jwt.sign(
      {user_id: user._id, email},
      tokenKey,
      {
        expiresIn: '2h'
      }
    )
    user.token = token;

    res.status(201).json(user);

  } catch(err) {

    console.log(err);

  } finally{

    await mongoose.connection.close();

  }

});

router.post('/login', async (req, res) => {
  try{

    const {email, password}: loginBody = req.body;

    if(!(email && password)){
      res.status(400).send('All input is required!');
    }

    await connect();

    const user = await findUserByEmail(email);

    const tokenKey = process.env.TOKEN_KEY;

    if(!tokenKey){
      return res.status(500).send('Server Problem - plesase try again later')
    }

    if(user && (await bcrypt.compare(password, user.password))){
      const token = jwt.sign(
        {user_id:user._id, email},
        tokenKey,
        {
          expiresIn: '2h'
        }
      );
      user.token = token;

      res.status(200).json(user);
    } else{
      
      res.status(400).send("Invalid Credentials");
      
    }


  } catch (err){

    console.log(err);

  }finally{

    await mongoose.connection.close();

  }
});

export default router;