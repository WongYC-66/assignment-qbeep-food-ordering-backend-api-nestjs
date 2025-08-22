export class LoginUserDto {
    username: string;
    password: string;
}

export class CreateOrderDto {
    outlet_id: Number;
    note: string;
    total_price: Number;
    ordered_foods: OrderedItem[];
}

class OrderedItem {
    food_id: Number;
    quantity: Number;
}
