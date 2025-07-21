import { Module } from "@nestjs/common";
import { RunsService } from "./runs.service";
import { RunsController } from "./runs.controller";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [RunsController],
  providers: [RunsService, PrismaService],
})
export class RunsModule {}
