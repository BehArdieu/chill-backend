import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'alice@chill.com', description: 'Email de l\'utilisateur' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'alice_art', description: 'Nom d\'utilisateur unique' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'Alice', description: 'Prénom' })
  @IsString()
  @MinLength(2)
  first_name: string;

  @ApiProperty({ example: 'Martin', description: 'Nom de famille' })
  @IsString()
  @MinLength(2)
  last_name: string;

  @ApiProperty({ example: 'motdepasse123', description: 'Mot de passe' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: ['Art', 'Photographie', 'Design'], 
    description: 'Centres d\'intérêt',
    required: false 
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];
}
