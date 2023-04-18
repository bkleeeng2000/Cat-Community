import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from './dto/comment.create.dto';

@Injectable()
export class CommentsService {
  // constructor(private readonly ) {}

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
