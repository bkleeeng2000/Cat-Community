import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true
};

@Schema(options)
export class Comment extends Document {
  @ApiProperty({
    required: true,
    description: 'target cat'
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats'
  })
  @IsNotEmpty()
  target: string;

  @ApiProperty({
    required: true,
    description: 'author'
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'cats'
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    required: true,
    description: 'contents'
  })
  @Prop({
    required: true
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: 'like Count'
  })
  @Prop({
    default: 0
  })
  @IsNotEmpty()
  @IsPositive()
  likeCount: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
