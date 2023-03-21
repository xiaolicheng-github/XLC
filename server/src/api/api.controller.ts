import { Controller, Get } from '@nestjs/common';
// import { ApiService } from './api.service';
import { DbService } from 'src/db/db.service';

@Controller('api')
export class ApiController {
  constructor(private readonly dbService: DbService) {}

  @Get('/study')
    async findAll() {
      return await this.dbService.dbSql('SELECT * FROM STUDY_DATA');
    }
}