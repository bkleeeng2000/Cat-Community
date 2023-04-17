import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';
import { CatsRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return !!result;
  }

  async create(cat: CatsRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat> {
    return this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat> {
    return this.catModel.findById(catId).select('-password');
  }

  async findByIdAndUploadImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:3000/media/${fileName}`;

    const newCat = await cat.save();
    console.log(newCat);

    return newCat.readOnlyData;
  }
}
