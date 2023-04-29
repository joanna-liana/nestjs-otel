import { DraftDto } from './data/draft.dto';
import { HateoasDto, IHateoasDto } from './hateoas.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDraftResponseDto
  extends HateoasDto
  implements IHateoasDto<DraftDto>
{
  @ApiProperty()
  data: DraftDto;
}
