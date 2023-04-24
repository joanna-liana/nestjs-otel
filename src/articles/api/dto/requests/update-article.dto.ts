import { PartialType } from '@nestjs/swagger';
import { CreateDraftDto } from './create-draft.dto';

export class UpdateArticleDto extends PartialType(CreateDraftDto) {}
