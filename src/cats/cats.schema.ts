import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @Prop()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name
  };
});
