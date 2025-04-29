import { Controller, Post, Body, Request, Get, Param, Patch } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role, ApplicationStatus } from '@prisma/client';
import { CreateApplicationDto } from './dto';
import { getCurrentUserId } from 'src/common/decorators';

@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post()
    @Roles(Role.STUDENT)
    apply(@Body() dto: CreateApplicationDto, @getCurrentUserId() userId: number) {
        return this.applicationService.apply(dto.projectId, userId);
    }

    @Get()
    @Roles(Role.STUDENT)
    getStudentApplications(@Request() req) {
        return this.applicationService.getStudentApplications(req.user.id);
    }

    @Get('project/:projectId')
    @Roles(Role.PROFESSOR)
    getProjectApplications(@Param('projectId') projectId: string) {
        return this.applicationService.getProjectApplications(+projectId);
    }

    @Patch(':id')
    @Roles(Role.PROFESSOR)
    updateStatus(@Param('id') id: string, @Body('status') status: ApplicationStatus) {
        return this.applicationService.updateStatus(+id, status);
    }
}