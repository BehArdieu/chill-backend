import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreateCommunityDto {
  @ApiProperty({ example: 'Artistes Parisiens', description: 'Nom de la communauté' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ 
    example: 'Communauté d\'artistes et d\'amateurs d\'art à Paris', 
    description: 'Description de la communauté',
    required: false 
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Art', description: 'Catégorie de la communauté' })
  @IsString()
  category: string;

  @ApiProperty({ 
    example: 'https://example.com/avatar.jpg', 
    description: 'URL de l\'avatar',
    required: false 
  })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiProperty({ 
    example: 'https://example.com/cover.jpg', 
    description: 'URL de la couverture',
    required: false 
  })
  @IsOptional()
  @IsString()
  cover_url?: string;

  @ApiProperty({ 
    example: true, 
    description: 'Communauté publique',
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  is_public?: boolean;
}
