
// import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateOrderDto, LoginUserDto } from './dto/all.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth/auth.guard';

@Controller('api/v1')
export class ApiController {

    constructor(
        private prisma: PrismaService,
        private auth: AuthService
    ) { }

    @Get("/outlets")
    @ApiQuery({ name: 'name', required: false })
    getOutlets(@Query('name') name: string) {
        if (!name) name = ''
        return this.prisma.outlet.findMany({
            where: {
                name: { contains: name, mode: 'insensitive' },
            }
        });
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

    // obsolete
    // @Get("/foods")
    // getFoods() {
    //     return this.prisma.food.findMany();
    // }

    @Get("/foods")
    @ApiQuery({ name: 'id', required: false })
    @ApiQuery({ name: 'name', required: false })
    getFoodById(@Query("id") food_id: string, @Query("name") name: string) {
        console.log({ food_id, name })
        if (food_id) {
            return this.prisma.food.findUnique({
                where: {
                    id: Number(food_id)
                }
            });
        }
        if (!name) name = ''
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
    signIn(@Body() loginUserDto: LoginUserDto) {
        if (!loginUserDto) {
            return "Please send in JSON of {username:..., password:...}"
        }
        return this.auth.signIn(loginUserDto.username, loginUserDto.password);
    }

    @UseGuards(AuthGuard)
    @Get("/orders")
    getOrders(@Request() req) {
        const user = req.user
        if (user.role === 'admin') {
            //return all orders
            return this.prisma.order.findMany()
        }

        if (user.role === 'user') {
            return this.prisma.order.findMany({
                where: {
                    user_id: user.id
                }
            })
        }
    }

    @UseGuards(AuthGuard)
    @Get("/orders/:order_id")
    async getOrderById(@Request() req, @Param("order_id") order_id: string) {
        const order = await this.prisma.order.findUnique({
            where: {
                id: Number(order_id)
            },
            include: {
                OrderedItems: true
            }
        })

        if (!order) {
            return {}
        }

        const user = req.user
        if (user.role !== 'admin' && order.user_id != Number(user.id)) {
            throw new UnauthorizedException();
        }

        return order
    }

    @UseGuards(AuthGuard)
    @Post("/orders")
    async postOneOrder(@Request() req, @Body() dto: CreateOrderDto) {
        // https://www.youtube.com/watch?v=QxyqR4yh1GI
        // https://www.prisma.io/docs/orm/prisma-client/queries/crud#create
        // 1. create Order 
        // 2. create OrderedItems in bulk

        const user = req.user
        console.log(user)

        const newOrder = await this.prisma.order.create({
            data: {
                user_id: Number(user.id),
                outlet_id: Number(dto.outlet_id),
                note: dto.note,
                total_price: Number(dto.total_price),
                created_at: new Date(),
            },
        });

        // console.log(dto)

        const ordered_foods = dto.ordered_foods.map(orderedItem => {
            return {
                order_id: newOrder.id,
                quantity: Number(orderedItem.quantity),
                food_id: Number(orderedItem.food_id),
            }
        })

        await this.prisma.orderedItems.createMany({
            data: ordered_foods
        });

        return { success: "order created" };
    }
}
