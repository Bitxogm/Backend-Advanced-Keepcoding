import express from 'express';

import { signinController } from '../controllers/authentication/signin-controller';
import { signupController } from '../controllers/authentication/signup-controller';

const authenticationRouter = express.Router();

authenticationRouter.post('/signup', signupController);
authenticationRouter.post('/signin', signinController);

export default authenticationRouter;
