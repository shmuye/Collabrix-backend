import { IsOptional, IsString, IsArray, IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skills?: string[]; // For STUDENT

    @IsOptional()
    @IsString()
    bio?: string

    @IsOptional()
    @IsString()
    researchInterests?: string; // For PROFESSOR

    @IsOptional()
    @IsEnum(Role)
    role?: Role; // Optional if needed for switching roles
}
