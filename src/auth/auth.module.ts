import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategy';


@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, AtStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
