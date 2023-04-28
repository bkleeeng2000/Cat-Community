import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from './dto/comment.create.dto';
import { CatsRepository } from '../cats/cats.repository';
import { Model } from 'mongoose';
import { Comment } from './comments.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly catsRepository: CatsRepository
  ) {}

  async getAllComments() {
    return Promise.resolve(undefined);
  }

  async getCommentById(id: string) {
    return Promise.resolve(undefined);
  }

  async createComment(id: string, comment: CommentCreateDto) {
    return `createComment id: ${id}, comment: ${comment.contents}`;
  }
}
