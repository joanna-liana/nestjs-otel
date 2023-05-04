import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DraftsController } from './api/drafts.controller';
import { ArticlesController } from './api/articles.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DraftsController, ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
