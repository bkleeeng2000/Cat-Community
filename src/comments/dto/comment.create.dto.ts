import { Comment } from '../comments.schema';
import { PickType } from '@nestjs/swagger';

export class CommentCreateDto extends PickType(Comment, [
  'author',
  'contents'
] as const) {}
