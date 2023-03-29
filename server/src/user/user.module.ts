import { Module } from "@nestjs/common";
import { DbModule } from "../db/db.module";
import { UsersService } from "./user.service";
import { EmailModule } from "../email/email.module";
import { UserController } from "./user.controller";

@Module({
  imports: [DbModule, EmailModule],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService]
})
export class UserModule {}