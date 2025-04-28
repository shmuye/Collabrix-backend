import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto, signinDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: signupDto): Promise<Tokens> {
        return this.authService.signup(dto)
    }
    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: signinDto): Promise<Tokens> {
        return this.authService.signin(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Req() req: Request) {
        const user = req.user
        return this.authService.logout(user['sub'])
    }

    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Req() req: Request) {
        const user = req.user
        return this.authService.refreshTokens(user['sub'], user['refreshToken'])
    }
}

