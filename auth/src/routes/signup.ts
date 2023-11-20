import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@myappsack/common-features';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage('Password must be between 6 and 20 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],validateRequest,
  async (req: Request, res: Response) => {
    
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser){
      throw new BadRequestError('User already exists')
    }

    const user =  User.build({email, password, name});
    await user.save();

    //generate web token
    const userJwt = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    },process.env.JWT_KEY!);

    //store it on session object
    req.session = {
      jwt: userJwt,
    };
    
    res.status(201).send(user)
  }
);

export { router as signupRouter };
