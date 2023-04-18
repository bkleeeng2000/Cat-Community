import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentCreateDto } from './dto/comment.create.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get all comments' })
  @Get('all')
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: 'Get comments by id' })
  @Get(':id')
  async getCommentById(@Param('id') id: string) {
    return await this.commentsService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Create comment' })
  @Post(':id')
  async createComment(@Param('id') id: string, @Body() body: CommentCreateDto) {
    return await this.commentsService.createComment(id, body);
  }

  // @ApiOperation({ summary: 'Update comment' })
  // @Post(':id')
  // async updateComment(@Param('id') id: string, @Body() body: CommentCreateDto) {
  //   return await this.commentsService.createComment(id, body);
  // }
}
