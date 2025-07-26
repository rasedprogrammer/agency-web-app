import { BadRequestException } from '~/globals/cores/error.core';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';

class AuthService {
  public async signUp(requestBody: any) {
    const { name, email, password } = requestBody;
    const userEmailExists = await UserModel.findOne({ email });
    if (userEmailExists) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword
    });
    await user.save();
  }

  public async signIn(requestBody: any) {}
}

export const authService: AuthService = new AuthService();
