import { ApiProperty } from '@nestjs/swagger';

export class CreateDraftDto {
  @ApiProperty({ example: `Unique title ${Date.now()}` })
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;
}
