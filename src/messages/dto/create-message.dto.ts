import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ 
    example: 'Salut ! Super exposition hier, merci pour l\'organisation !', 
    description: 'Contenu du message' 
  })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty({ 
    example: '44444444-4444-4444-4444-444444444444', 
    description: 'ID du destinataire',
    required: false 
  })
  @IsOptional()
  @IsString()
  receiver_id?: string;

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
