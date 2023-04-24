import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../../domain/Article';

export class DraftDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty({ example: false })
  published: false;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static from(article: Article) {
    const dto = new DraftDto();

    dto.id = article.props.id;
    dto.body = article.props.body;
    dto.createdAt = article.props.createdAt;
    dto.description = article.props.description;
    dto.published = article.props.published as false;
    dto.title = article.props.title;
    dto.updatedAt = article.props.updatedAt;

    return dto;
  }
}
