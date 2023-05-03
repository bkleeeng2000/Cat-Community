import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comments.schema';
import { CatsModule } from '../cats/cats.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    CatsModule,
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
  ]
})
export class CommentsModule {}
