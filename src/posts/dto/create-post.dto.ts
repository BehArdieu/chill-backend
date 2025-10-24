import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ 
    example: 'Super exposition hier soir ! Les œuvres étaient vraiment impressionnantes 🎨', 
    description: 'Contenu du post' 
  })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty({ 
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], 
    description: 'URLs des médias',
    required: false 
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  media_urls?: string[];

  @ApiProperty({ 
    example: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
    description: 'ID de la communauté',
    required: false 
  })
  @IsOptional()
  @IsString()
  community_id?: string;

  @ApiProperty({ 
    example: 'ffffffff-ffff-ffff-ffff-ffffffffffff', 
    description: 'ID de l\'événement',
    required: false 
  })
  @IsOptional()
  @IsString()
  event_id?: string;
}
