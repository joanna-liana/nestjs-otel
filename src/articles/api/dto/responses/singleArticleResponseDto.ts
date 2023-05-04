import { ArticleDto } from './data/article.dto';
import { HateoasDto, IHateoasDto } from './hateoas.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SingleArticleResponseDto
  extends HateoasDto
  implements IHateoasDto<ArticleDto>
{
  @ApiProperty()
  data: ArticleDto;
}
