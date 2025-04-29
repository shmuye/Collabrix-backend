import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { getCurrentUserId } from 'src/common/decorators';

@Controller('projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @Post()
    @Roles(Role.PROFESSOR)
    create(@Body() createProjectDto: CreateProjectDto, @getCurrentUserId() userId: number) {
        const professorId = userId; // Get from JWT
        return this.projectService.create(createProjectDto, professorId);
    }

    @Get()
    findAll() {
        return this.projectService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectService.findOne(+id);
    }

    @Patch(':id')
    @Roles(Role.PROFESSOR)
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Request() req: any) {
        const professorId = req.user.id;
        return this.projectService.update(+id, updateProjectDto, professorId);
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    remove(@Param('id') id: string) {
        return this.projectService.remove(+id);
    }
}
