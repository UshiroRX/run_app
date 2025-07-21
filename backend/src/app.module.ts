import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { RunsModule } from "./runs/runs.module";

@Module({
  imports: [AuthModule, RunsModule],
})
export class AppModule {}
