// https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0

import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient();

const seedUser = async () => {

    const fakeUsers = [
        { username: "user1", password: "user1", role: "user", name: "Alice" },
        { username: "user2", password: "user2", role: "user", name: "Bob" },
        { username: "user3", password: "user3", role: "user", name: "Cathy" },
        { username: "admin", password: "admin", role: "admin", name: "admin-name" },
        { username: "outlet1", password: "outlet1", role: "outlet", name: "KFC" },
        { username: "outlet2", password: "outlet2", role: "outlet", name: "McD" },
        { username: "outlet3", password: "outlet3", role: "outlet", name: "BurgerK" },
    ]

    const tasks = fakeUsers.map(({ username, password, role, name }) => {
        return prisma.user.upsert({
            where: { username: username },
            update: {},
            create: {
                password,
                role,
                name,
                username,
            },
        })
    });

    await Promise.all(tasks)
    console.log("done seeding users")
}

const seedOutlet = async () => {

    const fakeOutlets = [
        { username: "outlet1", name: "KFC", location: "No-1, Jln Ampang, 52100, KL" },
        { username: "outlet2", name: "McD", location: "No-2, Jln Ampang, 52100, KL" },
        { username: "outlet3", name: "BurgerK", location: "No-3, Jln Ampang, 52100, KL" },
    ]

    const tasks = fakeOutlets.map(({ username, name, location }) => {
        return prisma.outlet.upsert({
            where: { name: name },
            update: {},
            create: {
                name,
                location,
                owner: {
                    connect: {
                        username: username,
                    },
                }
            },
        })
    });

    await Promise.all(tasks)
    console.log("done seeding outlets")
}

const seedFood = async () => {

    const fakeFoods = [
        {
            outletName: "KFC",
            foods: [
                { name: "Fried Chicken", description: "Yummy fried chicken", type: "western", price: 6.50, image_url: "" },
                { name: "Burger", description: "Yummy Burger", type: "western", price: 15.50, image_url: "" },
                { name: "Fries", description: "Yummy fries", type: "western", price: 5.50, image_url: "" },
            ]
        },
        {
            outletName: "McD",
            foods: [
                { name: "Fried Chicken", description: "Cheaper fried chicken", type: "western", price: 3.50, image_url: "" },
                { name: "Burger", description: "Cheaper Burger", type: "western", price: 7.50, image_url: "" },
                { name: "Fries", description: "Cheaper fries", type: "western", price: 2.50, image_url: "" },
            ]
        },
        {
            outletName: "BurgerK",
            foods: [
                { name: "Fried Chicken", description: "Legacy fried chicken", type: "western", price: 1.50, image_url: "" },
                { name: "Burger", description: "Legacy Burger", type: "western", price: 2.50, image_url: "" },
                { name: "Fries", description: "Legacy fries", type: "western", price: 0.50, image_url: "" },
            ]
        },
    ]

    const tasks = []

    for (let { outletName, foods } of fakeFoods) {

        const outlet = await prisma.outlet.findFirst({
            where: { name: outletName }
        })

        if (!outlet) throw new Error("Could not find outlet")

        foods.forEach(({ name, description, type, price, image_url }) => {
            tasks.push(prisma.food.upsert({
                where: {
                    outlet_id_name: {
                        name: name,
                        outlet_id: outlet.id
                    }
                },
                update: {},
                create: {
                    name,
                    description,
                    type,
                    outlet: {
                        connect: {
                            id: outlet.id
                        }
                    },
                    price,
                    image_url,
                },
            }))
        })
    }

    const res = await Promise.all(tasks)
    console.log("done seeding foods")
}

async function main() {
    console.log("### seeding database ...")
    await seedUser()
    await seedOutlet()
    await seedFood()
    console.log("###s eeding completed!");
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

