import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ApiService {
  
  db:DbService = null;

  constructor(private readonly dbService: DbService) {}

  async findSutdyAll() {
    return await this.dbService.dbSql('SELECT * FROM STUDY_DATA');
  }
}