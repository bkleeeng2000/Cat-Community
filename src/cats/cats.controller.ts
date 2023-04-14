import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.gaurd';
import { CurrentUser } from '../common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: '현재 고양이 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readOnlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...'
  })
  @ApiResponse({
    status: 201,
    description: 'SignUp Ok'
  })
  @Post()
  async signUp(@Body() body: CatsRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image'))
  @Post('upload/cats')
  uploadCatImg(@UploadedFiles() images: Array<Express.Multer.File>) {
    return 'uploadImg';
  }
}
