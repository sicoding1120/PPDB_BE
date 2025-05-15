import { Controller, Get, Post } from '@nestjs/common';
import { ParentService } from './parent.service';

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
}
