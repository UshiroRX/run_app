import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { RunsService } from "./runs.service";
import { CreateRunDto } from "./dto/create-run.dto";
import { JwtAuthGuard } from "../shared/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Express } from "express";

@Controller("runs")
export class RunsController {
  constructor(private runsService: RunsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("photo", { dest: "./uploads" }))
  async create(
    @Req() req: any,
    @Body() dto: any, // расширяем dto для lat/lng
    @UploadedFile() file?: Express.Multer.File
  ) {
    // Приведение типов
    const data = {
      ...dto,
      distance: dto.distance ? parseFloat(dto.distance) : undefined,
      time: dto.time ? parseInt(dto.time) : undefined,
      lat: dto.lat ? parseFloat(dto.lat) : undefined,
      lng: dto.lng ? parseFloat(dto.lng) : undefined,
    };
    return {
      ...(await this.runsService.create(req.user.sub, data)),
      photoUrl: file ? `/uploads/${file.filename}` : null,
      lat: data.lat ?? null,
      lng: data.lng ?? null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    return (await this.runsService.findAllForUser(req.user.sub)).map((run) => ({
      ...run,
      photoUrl: null, // для совместимости, если фото не загружено
      lat: null,
      lng: null,
    }));
  }
}
