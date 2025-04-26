import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ApplicationModule } from './application/application.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [AuthModule, UserModule, ApplicationModule, ProfileModule, ProjectModule, PrismaModule],
})
export class AppModule { }
