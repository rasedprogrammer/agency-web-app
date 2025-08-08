import JWT from 'jsonwebtoken';

interface IJwtProvider {
  _id: string;
  name: string;
  email: string;
}

class JwtProvider {
  public async generateJWT(payload: IJwtProvider) {
    const secret = process.env.JWT_SECRET;
    if (!secret || typeof secret !== 'string') {
      throw new Error('JWT_SECRET environment variable is not defined');
    }
    return JWT.sign(payload, secret, {
      expiresIn: '1h'
    });
  }
}

export const jwtProvider: JwtProvider = new JwtProvider();
