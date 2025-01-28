// import { userRole } from "../enum/user.role.enum";
// import
// export class CreateUserDto {
// @IsNotEmpty {{message: `sorrythis field is not empty, kindly fill it`}}
// @IsString()
// name: string

import {MinLength, MaxLength, Matches, isNotEmpty, IsEmail, IsOptional, IsString, IsNotEmpty } from "class-validator";
import { userRole } from "../enum/user.role.enum" ;
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8,{message: 'sorry you must put in 8 character'})
    @MaxLength(16, {message: 'password should not be more than 16 characters'})
    @Matches(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[^\da-zA-Z]).{8,}$/,{message: 
        'password must contain atleast One Uppercase,One number and One special key'})
        password: string;

        @IsOptional()
        role:userRole
}





