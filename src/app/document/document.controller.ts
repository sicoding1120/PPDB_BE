import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentService } from './document.service';
import { get } from 'http';

@Controller('document')
export class DocumentController {
  constructor(private ds: DocumentService) {}

  @Post('/save')
  async saveDocument(@Body() payload: any) {
    return await this.ds.savefile(payload);
    }

    @Get("/")
    async getDocument() {
        return await this.ds.getDocument();
    }

    @Get("/:id")
    async getDocumentByStudentID(@Param("id") id:string) {

  }
  @Put("/update/:id")
  async updateStatusDoc(@Body() payload: any, @Param("id") id:string) {
    return await this.ds.updateStatusDoc(payload, id);
  }
    
}
