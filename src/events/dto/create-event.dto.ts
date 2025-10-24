import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsDateString, MinLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Exposition Art Contemporain', description: 'Titre de l\'événement' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ 
    example: 'Découverte d\'œuvres d\'artistes émergents', 
    description: 'Description de l\'événement',
    required: false 
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Art', description: 'Catégorie de l\'événement' })
  @IsString()
  category: string;

  @ApiProperty({ 
    example: '2024-02-15T18:00:00Z', 
    description: 'Date et heure de début' 
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({ 
    example: '2024-02-15T22:00:00Z', 
    description: 'Date et heure de fin',
    required: false 
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;

  @ApiProperty({ 
    example: 'Galerie du Marais, 75004 Paris', 
    description: 'Adresse de l\'événement',
    required: false 
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ 
    example: '50', 
    description: 'Nombre maximum de participants',
    required: false 
  })
  @IsOptional()
  @IsString()
  max_participants?: string;

  @ApiProperty({ 
    example: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
    description: 'ID de la communauté',
    required: false 
  })
  @IsOptional()
  @IsString()
  community_id?: string;

  @ApiProperty({ 
    example: true, 
    description: 'Événement public',
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  is_public?: boolean;
}
