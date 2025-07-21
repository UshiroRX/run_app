import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRunDto } from "./dto/create-run.dto";

@Injectable()
export class RunsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateRunDto) {
    return this.prisma.run.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAllForUser(userId: number) {
    return this.prisma.run.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }
}
