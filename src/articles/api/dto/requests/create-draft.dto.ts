import { ApiProperty } from '@nestjs/swagger';

export class CreateDraftDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  body: string;
}
