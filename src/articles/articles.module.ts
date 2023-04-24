import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DraftsController } from './api/drafts.controller';

@Module({
  imports: [PrismaModule],
  controllers: [DraftsController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
