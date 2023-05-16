import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UniversityService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async getAll(page: number, country: string) {
    const perPage = 20;

    if (Number.isNaN(page)) {
      const totalRecords = await this.prisma.universities.count({
        where: {
          country: country,
        },
      });
      const totalPages = Math.ceil(totalRecords / perPage);

      const universities = await this.prisma.universities.findMany({
        where: {
          country: country,
        },
        take: perPage,
      });

      return {
        page: 1,
        perPage: perPage,
        totalRecords: totalRecords,
        totalPages: totalPages,
        universities: universities,
      };
    } else {
      const skip = perPage * (page - 1);

      const totalRecords = await this.prisma.universities.count({
        where: {
          country: country,
        },
      });
      const totalPages = Math.ceil(totalRecords / perPage);

      const universities = await this.prisma.universities.findMany({
        where: {
          country: country,
        },
        take: perPage,
        skip: skip,
      });

      return {
        page: page,
        perPage: perPage,
        totalRecords: totalRecords,
        totalPages: totalPages,
        universities: universities,
      };
    }
  }

  async getById(id: number) {
    return this.prisma.universities.findUnique({ where: { id } });
  }

  async create(data: {
    domains: string;
    name: string;
    alpha_two_code: string;
    state_province: string;
    country: string;
    web_pages: string;
  }) {
    const existingUniversity = await this.prisma.universities.findFirst({
      where: {
        name: data.name,
        state_province: data.state_province,
        country: data.country,
      },
    });

    if (existingUniversity) {
      throw new ConflictException('University already exists in the database.');
    }

    return this.prisma.universities.create({ data });
  }

  async update(
    id: number,
    data: {
      domains?: string;
      name?: string;
      state_province?: string;
      web_pages?: string;
    },
  ) {
    return this.prisma.universities.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.universities.delete({ where: { id } });
  }
}
