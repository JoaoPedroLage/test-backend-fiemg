import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { UniversityService } from '../services/university.service';
// import { AuthGuard } from '../guards/auth.guard';

@Controller('universities')
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @Get()
  getAll(@Query('page') page: number, @Query('country') country: string) {
    return this.universityService.getAll(Number(page), country);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.universityService.getById(Number(id));
  }

  // @UseGuards(AuthGuard)
  @Post()
  create(
    @Body()
    universityData: {
      domains: string;
      name: string;
      alpha_two_code: string;
      state_province: string;
      country: string;
      web_pages: string;
    },
  ) {
    return this.universityService.create(universityData);
  }

  // @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    universityData: {
      domains?: string;
      name?: string;
      state_province?: string;
      web_pages?: string;
    },
  ) {
    return this.universityService.update(Number(id), universityData);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.universityService.delete(Number(id));
  }
}
