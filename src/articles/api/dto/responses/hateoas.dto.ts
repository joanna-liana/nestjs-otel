import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { HttpMethod } from '../../HttpMethod';

type LinksDto = Record<string, SingleLinkDto>;

export class SingleLinkDto {
  @ApiProperty()
  href: string;

  @ApiProperty({ required: false, default: HttpMethod.GET, enum: HttpMethod })
  method?: HttpMethod;
}

export interface IHateoasDto<DataDto> {
  data: DataDto;

  _links: LinksDto;
}

@ApiExtraModels(SingleLinkDto)
export class HateoasDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: { $ref: getSchemaPath(SingleLinkDto) },
  })
  _links: Record<string, SingleLinkDto>;
}

export interface IHateoasDto<DataDto> {
  data: DataDto;

  _links: Record<string, SingleLinkDto>;
}
