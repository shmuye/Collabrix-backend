import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "@prisma/client";
export class AuthDto {
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    role: Role
}
