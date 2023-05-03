import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../comments/comments.schema';

const options: SchemaOptions = {
  timestamps: true
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    required: true,
    example: 'test@naver.com',
    description: 'email'
  })
  @Prop({
    required: true,
    unique: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: 'testName',
    description: 'name'
  })
  @Prop({
    required: true
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'password',
    description: 'password'
  })
  @Prop({
    required: true
  })
  password: string;

  @Prop({
    default: `https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg`
  })
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
  };

  readonly comments: Comment[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'author'
});
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });
export const CatSchema = _CatSchema;
