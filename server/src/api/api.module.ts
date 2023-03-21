import { Module } from "@nestjs/common";
import { ApiService } from "./api.service";
import { ApiController } from "./api.controller";
import { DbModule } from "src/db/db.module";

@Module({
  imports: [DbModule],
  controllers: [ ApiController ],
  providers: [ ApiService ],
  exports: [ ApiService ]
})
export class ApiModule {
}