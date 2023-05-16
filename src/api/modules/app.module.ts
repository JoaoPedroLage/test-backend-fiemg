import { Module } from '@nestjs/common';
import { UniversityModule } from '../modules/university.module';
import { AuthModule } from '../modules/auth.module';
// import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [UniversityModule, AuthModule],
  // providers: [AuthGuard],
})
export class AppModule {}
