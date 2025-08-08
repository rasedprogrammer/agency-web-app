import { BadRequestException } from '~/globals/cores/error.core';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import { jwtProvider } from '~/globals/provider/jwt.provider';

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

    const jwtPayload = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email
    };
    const accessToken = await jwtProvider.generateJWT(jwtPayload);
    return {
      accessToken: accessToken,
      user: jwtPayload
    };
  }

  public async signIn(requestBody: any) {
    const { email, password } = requestBody;
    const userByEmail = await UserModel.findOne({ email });
    if (!userByEmail) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, userByEmail.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    const jwtPayload = {
      _id: userByEmail._id.toString(),
      name: userByEmail.name,
      email: userByEmail.email
    };
    const accessToken = await jwtProvider.generateJWT(jwtPayload);
    return {
      accessToken: accessToken,
      user: jwtPayload
    };
  }
}

export const authService: AuthService = new AuthService();
