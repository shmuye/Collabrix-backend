import { IsEmail, IsNotEmpty } from "class-validator";

export class signinDto {
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

}
