import { HateoasDto, IHateoasDto } from './hateoas.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleDto } from './data/article.dto';

export class PublishDraftResponseDto
  extends HateoasDto
  implements IHateoasDto<ArticleDto>
{
  @ApiProperty()
  data: ArticleDto;
}
