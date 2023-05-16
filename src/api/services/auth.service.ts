import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from '../interfaces/dto/create-user.dto';
import { LoginDto } from '../interfaces/dto/login.dto';
import { ChangePasswordDto } from '../interfaces/dto/change-password.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Check if the user with the given email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return the created user (you can customize the returned data as needed)
    return { id: user.id, email: user.email };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user with the given email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate a JWT token
    const token = this.jwtService.sign({ userId: user.id });

    // Return the token (you can customize the returned data as needed)
    return { token };
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const { email, oldPassword, newPassword } = changePasswordDto;

    // Find the user with the given email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the provided old password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    // Return the updated user (you can customize the returned data as needed)
    return { id: updatedUser.id, email: updatedUser.email };
  }

  async validateUser(payload: any) {
    // Validate the user based on the JWT payload (e.g., check if the user still exists)
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Return the validated user
    return user;
  }

  async getUserById(userId: number) {
    // Find a user by their ID
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Return the found user (you can customize the returned data as needed)
    return { id: user.id, email: user.email };
  }

  async generateAccessToken(user: any) {
    // Generate a new access token for the user
    const token = this.jwtService.sign({ userId: user.id });

    // Return the new access token
    return { token };
  }
}
