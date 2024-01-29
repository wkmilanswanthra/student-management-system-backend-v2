import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { AuthConfig } from 'src/common/config/auth.config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly authConfig: AuthConfig,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authConfig.authority}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: authConfig.clientId,
      issuer: authConfig.authority,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return !!payload.sub;
  }
}
