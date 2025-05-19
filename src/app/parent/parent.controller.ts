import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParentService } from './parent.service';
import { CreateFatherDto } from './father.dto';
import { CreateMotherDto } from './mother.dto';

@Controller('parent')
export class ParentController {
  constructor(private ps: ParentService) {}

  //   @Get('/')
  //   async getAllParent() {
  //     return await this.ps.getAllParents();
  //   }

  @Post('/create')
  async createParent(payload: any) {
    return await this.ps.createParent(payload);
  }

  @Post('/create-father')
  async createFather(@Body() payload: CreateFatherDto) {
    return await this.ps.createFather(payload);
  }

  @Post('create-mother')
  async createMother(@Body() payload: CreateMotherDto) {
    return await this.ps.createMother(payload);
  }

  @Get("/all-father")
  async getALlFather() {
    return await this.ps.getAllFather();
  }

  @Get("/all-mother")
  async getAllMother() {
    return await this.ps.getAllMother();
  }
}

