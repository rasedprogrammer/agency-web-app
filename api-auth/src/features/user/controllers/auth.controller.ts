import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import HTTP_STATUS from '~/globals/constants/http.constant';
import { log } from 'console';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const data = await authService.signUp(req.body);
    return res.json({
      message: 'User created successfully',
      data
    });
  }

  public async signIn(req: Request, res: Response) {}

  public async getCurrentUser(req: Request, res: Response) {}

  public async logout(req: Request, res: Response) {}
}

export const authController: AuthController = new AuthController();
