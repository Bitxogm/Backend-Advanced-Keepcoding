import type { Request, Response } from 'express';

import { CreateUserUsecase } from '@/domain/use-cases/user/create-user-usecase';
import { UserMongoRepository } from '@/infrastructure/repositories/user/user-mongodb-repository';
import { SecurtityBcryptService } from '@/infrastructure/service/security-bcrypt-service';

export const signupController = async (req: Request, res: Response) => {
  const userMongoRepository = new UserMongoRepository();
  const securityBcryptService = new SecurtityBcryptService();
  const createUserUseCase = new CreateUserUsecase(userMongoRepository, securityBcryptService);

  try {
    if (!req.body || typeof req.body !== 'object') {
      throw new Error('Email and password are required');
    }
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    await createUserUseCase.execute({
      email: email as string,
      password: password as string,
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    if (error instanceof Error && error.message === 'Email and password are required') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
};
