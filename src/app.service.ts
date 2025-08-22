import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! visit : http://localhost:3000/api for API documentation';
  }
}
