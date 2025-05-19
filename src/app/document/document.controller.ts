import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    
}
