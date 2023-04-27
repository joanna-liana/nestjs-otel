import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../../../domain/Article';

export class ArticleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty({ example: true })
  published: true;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static from(article: Article) {
    const dto = new ArticleDto();

    dto.id = article.props.id;
    dto.body = article.props.body;
    dto.createdAt = article.props.createdAt;
    dto.description = article.props.description;
    dto.published = article.props.published as true;
    dto.title = article.props.title;
    dto.updatedAt = article.props.updatedAt;

    return dto;
  }
}
