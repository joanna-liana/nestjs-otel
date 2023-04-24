import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './api/articles.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { DraftsController } from './api/drafts.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ArticlesController, DraftsController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
