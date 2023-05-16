import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import generateSecretKey from '../utils/generateSecretKey';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: generateSecretKey(),
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
