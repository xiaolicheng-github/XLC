import { Controller, Get, Render } from '@nestjs/common';
@Controller()
export class AppController {

  @Get()
  @Render('./blog/index.html')
  index(){}

  @Get('admin')
  @Render('./manage/index.html')
  admin(){}
}
