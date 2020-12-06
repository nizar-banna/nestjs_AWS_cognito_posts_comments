import { Inject, Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthConfig } from './auth.config';
import { RegisterUserDto } from './dto/registerUser.dto';
import { VerifyUserDto } from './dto/verifyUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { Users } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthConfig')
    private readonly authConfig: AuthConfig,
    private readonly usersService: UsersService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.authConfig.userPoolId,
      ClientId: this.authConfig.clientId,
    });
  }
  private userPool: CognitoUserPool;
  registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;
    return new Promise((resolve) => {
      return this.userPool.signUp(
        email,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        async (err, result) => {
          if (!result) {
            resolve({
              statusCode: 400,
              response: err.message || JSON.stringify(err),
            });
          } else {
            const createUser = new Users();
            createUser.userName = result.user.getUsername();
            createUser.cognitoId = result.userSub;
            await this.usersService.create(createUser);
            return resolve({ statusCode: 201, response: result.user });
          }
        },
      );
    });
  }

  verifyUser(verifyUserDto: VerifyUserDto) {
    const { email, code } = verifyUserDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve) => {
      return newUser.confirmRegistration(code, true, (err, result) => {
        if (!result) {
          resolve({
            statusCode: 400,
            response: err.message || JSON.stringify(err),
          });
        } else {
          resolve({ statusCode: 200, message: result });
        }
      });
    });
  }
  authenticateUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const userData = {
      Username: email,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          return resolve({ statusCode: 200, response: result });
        },
        onFailure: (err) => {
          resolve({
            statusCode: 400,
            response: err.message || JSON.stringify(err),
          });
        },
      });
    });
  }
}
