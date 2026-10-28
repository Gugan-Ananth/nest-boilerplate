
import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

import { AuthGuard } from '../auth/guard/auth.guard';
import { ROUTES } from 'src/shared/utils/routes';

@Controller(ROUTES.USER.ROOT)
export class UsersController {
    constructor(private userService: UsersService) {}

    @Patch(ROUTES.USER.UPDATE)
    @UseGuards(AuthGuard)
    update(@Req() req: Request, @Body() body: UpdateUserDto){
        const payload = req['payload'];
        return this.userService.update(body, payload.sub);
    }

    @Patch(ROUTES.USER.CHANGEPASSWORD)
    @UseGuards(AuthGuard)
    changePassword(@Req() req: Request, @Body() body: ChangePasswordDto){
        const payload = req['payload'];
        return this.userService.changePassword(body, payload.sub);
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllUsers(){
        return this.userService.getAllUsers();
    }
}
