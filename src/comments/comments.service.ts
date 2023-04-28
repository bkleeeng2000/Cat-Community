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
    try {
      const comments = await this.commentModel.find();
      return comments;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getCommentById(id: string) {
    return Promise.resolve(undefined);
  }

  async createComment(id: string, comment: CommentCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id
      );
      const { contents, author } = comment;
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      const newComment = new this.commentModel({
        target: targetCat._id,
        contents,
        author: validatedAuthor._id
      });
      return await newComment.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async likeComment(id: string) {
    try {
      const comment = await this.commentModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
