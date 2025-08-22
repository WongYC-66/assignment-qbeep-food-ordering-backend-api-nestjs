
// import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('api/v1')
export class ApiController {

    constructor(private prisma: PrismaService) { }

    @Get("/outlets")
    getOutlets() {
        return this.prisma.outlet.findMany();
    }

    @Get("/outlets/:outlet_id")
    getOutletById(@Param("outlet_id") outlet_id: string) {
        return this.prisma.outlet.findUnique({
            where: {
                id: Number(outlet_id)
            },
            include: {
                Food: true,
            },
        });
    }

    @Get("/foods")
    getFoods() {
        return this.prisma.food.findMany();
    }

    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'name', required: false })
    @Get("/foods/search")
    getFoodById(@Query("id") food_id: string, @Query("name") name: string) {
        console.log({ food_id, name })
        if (food_id) {
            return this.prisma.food.findUnique({
                where: {
                    id: Number(food_id)
                }
            });
        }
        if(!name) name = ''
        return this.prisma.food.findMany({
            where: {
                OR: [
                    { name: { contains: name, mode: 'insensitive' } },
                    { description: { contains: name, mode: 'insensitive' } },
                ],
            }
        });
    }

    @Post("/users/login")
    postLogin() {
        return "todo: login user and return a simple token";
    }


    @Get("/orders")
    getOrders() {
        return "todo: return all order accesible by user";
    }

    @Get("/orders/:order_id")
    getOrderById() {
        return "todo: return one order accesible by user";
    }

    @Post("/orders")
    postOneOrder() {
        return "todo: make a new order by user";
    }



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
