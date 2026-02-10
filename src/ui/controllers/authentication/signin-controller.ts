import type { Request, Response } from 'express';
import * as Zod from 'zod';

import { LoginUserUseCase } from '@/domain/use-cases/user/login-user-usecase';
import { UserMongoRepository } from '@/infrastructure/repositories/user/user-mongodb-repository';
import { SecurityBcryptService } from '@/infrastructure/services/security-bcrypt-service';

const signinBodyValidator = Zod.object({
  email: Zod.string().email('Invalid email'),
  password: Zod.string(),
});

export const signinController = async (
  request: Request,
  response: Response,
  next: (err?: any) => void
) => {
  try {
    const { email, password } = signinBodyValidator.parse(request.body);

    const userMongoRepository = new UserMongoRepository();
    const securityBcryptService = new SecurityBcryptService();

    const loginUserUsecase = new LoginUserUseCase(userMongoRepository, securityBcryptService);

    const { token } = await loginUserUsecase.execute({
      email: email,
      password: password,
    });

    response.json({
      message: 'User signed in successfully.',
      token: token,
    });
  } catch (error) {
    if (error instanceof Zod.ZodError) {
      // If it's a validation error from Zod, convert to a more user-friendly message
      response.status(400).json({ message: 'Email and password are required.' });
    } else {
      // Pass other errors to the error handler middleware
      next(error);
    }
  }
};
