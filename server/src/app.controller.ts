import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('./blog/index.html')
  index(){}

  @Get('admin')
  @Render('./manage/index.html')
  admin(){}
}
