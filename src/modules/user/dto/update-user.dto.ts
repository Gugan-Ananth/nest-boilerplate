import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    firstName?: string;

    @IsNotEmpty()
    @IsOptional()
    lastName?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsString()
    @IsOptional()
    role?: 'ADMIN' | 'CUSTOMER'
}