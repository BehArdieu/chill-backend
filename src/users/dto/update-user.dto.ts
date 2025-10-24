import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Alice', description: 'Prénom', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  first_name?: string;

  @ApiProperty({ example: 'Martin', description: 'Nom de famille', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  last_name?: string;

  @ApiProperty({ example: 'Passionnée d\'art et de photographie', description: 'Biographie', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ 
    example: ['Art', 'Photographie', 'Design'], 
    description: 'Centres d\'intérêt',
    required: false 
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiProperty({ example: 'https://example.com/avatar.jpg', description: 'URL de l\'avatar', required: false })
  @IsOptional()
  @IsString()
  avatar_url?: string;
}
