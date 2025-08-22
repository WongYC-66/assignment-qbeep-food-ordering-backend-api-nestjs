
// import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/v1')
export class ApiController {

    constructor(private PrismaService: PrismaService) { }

    @Get("/outlets")
    getOutlets() {
        return "a"
    }

    // constructor(private catsService: CatsService) { }

    // @Post()
    // async create(@Body() createCatDto: CreateCatDto) {
    //     // this.catsService.create(createCatDto);
    // }

    // @Get()
    // async findAll(): Promise<Cat[]> {
    //     throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    //     // return this.catsService.findAll();
    // }

    // @Post()
    // create(@Body() createCatDto: CreateCatDto) {
    //     return 'This action adds a new cat';
    // }

    // @Get()
    // findAll(@Query() query: ListAllEntities) {
    //     return `This action returns all cats (limit: ${query.limit} items)`;
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return `This action returns a #${id} cat`;
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    //     return `This action updates a #${id} cat`;
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return `This action removes a #${id} cat`;
    // }
}
