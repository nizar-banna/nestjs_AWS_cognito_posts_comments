import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthConfig } from './auth.config';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  providers: [AuthService, AuthConfig, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
