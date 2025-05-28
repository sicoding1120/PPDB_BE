import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';

@Controller('announcement')
export class AnnouncementController {
    constructor(private as:AnnouncementService) {}


    @Get()
    async getAllAnnouncement() {
        return await this.as.getAllAnnouncement();
    }

    @Post("/save")
    async saveAnnouncement(@Body() payload: any) {
        return await this.as.createAnnouncement(payload);
    }

    @Patch("/publish/:id")
    async publishAnnouncement(@Param('id') id: string) {
        return await this.as.publishAnnouncement(id);
    }

    @Get("/detail/:id")
    async getAnnouncementById(@Param('id') id: string) {
        return await this.as.getAnnouncementById(id);
    }
}
