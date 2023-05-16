import { Module } from '@nestjs/common';
import { UniversityController } from '../controllers/university.controller';
import { UniversityService } from '../services/university.service';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [UniversityController],
  providers: [UniversityService],
})
export class UniversityModule {}
