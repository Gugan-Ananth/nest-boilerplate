import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from './guard/auth.guard';
import { ROUTES } from 'src/shared/utils/routes';

@Controller(ROUTES.AUTH.ROOT)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post(ROUTES.AUTH.LOGIN)
    login(@Body(ValidationPipe) body: LoginDto){
        return this.authService.login(body);
    }

    @Post(ROUTES.AUTH.SIGNUP)
    signup(@Body(ValidationPipe) body: SignUpDto){
        return this.authService.signup(body);
    }

    @Post(ROUTES.AUTH.REFRESHTOKEN)
    refreshToken(@Body() body: RefreshTokenDto){
        return this.authService.refreshToken(body);
    }

    @Post(ROUTES.AUTH.LOGOUT)
    @UseGuards(AuthGuard)
    logout(@Req() req: Request, @Param('id', ValidationPipe) id: string){
        const payload = req['payload'];
        return this.authService.logout(payload.sub);
    }
}
