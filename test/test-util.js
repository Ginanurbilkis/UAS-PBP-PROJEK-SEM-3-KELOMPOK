import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestRaossundas = async () => {
    await prismaClient.raosSunda.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestRaossunda = async () => {
    await prismaClient.raosSunda.create({
        data: {
            username: "test",
            first_name: "test",
            last_name: "test",
            email: "test@pzn.com",
            phone: "080900000"
        }
    })
}

export const createManyTestRaossundas = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.raosSunda.create({
            data: {
                username: `test`,
                first_name: `test ${i}`,
                last_name: `test ${i}`,
                email: `test${i}@pzn.com`,
                phone: `080900000${i}`
            }
        })
    }
}

export const getTestRaossunda = async () => {
    return prismaClient.raosSunda.findFirst({
        where: {
            username: 'test'
        }
    })
}

