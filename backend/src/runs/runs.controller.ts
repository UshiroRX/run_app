import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { RunsService } from "./runs.service";
import { CreateRunDto } from "./dto/create-run.dto";
import { JwtAuthGuard } from "../shared/jwt-auth.guard";

@Controller("runs")
export class RunsController {
  constructor(private runsService: RunsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: any, @Body() dto: CreateRunDto) {
    return this.runsService.create(req.user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    return this.runsService.findAllForUser(req.user.sub);
  }
}
