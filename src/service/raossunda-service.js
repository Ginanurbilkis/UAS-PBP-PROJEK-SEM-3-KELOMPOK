import { validate } from "../validation/validation.js";
import {
  createRaossundaValidation,
  getRaossundaValidation,
  searchRaossundaValidation,
  updateRaossundaValidation,
} from "../validation/raossunda-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (user, request) => {
  const raossunda = validate(createRaossundaValidation, request);
  raossunda.username = user.username;

  return prismaClient.raosSunda.create({
    data: raossunda,
    select: {
      id: true,
      makanan: true,
      minuman: true,
      paket_murah: true,
      jumlah: true,
      harga: true,
    },
  });
};

const get = async (user, raossundaId) => {
  raossundaId = validate(getRaossundaValidation, raossundaId);

  const raossunda = await prismaClient.raosSunda.findFirst({
    where: {
      username: user.username,
      id: raossundaId,
    },
    select: {
      id: true,
      makanan: true,
      minuman: true,
      paket_murah: true,
      jumlah: true,
      harga: true,
    },
  });

  if (!raossunda) {
    throw new ResponseError(404, "raossunda is not found");
  }

  return raossunda;
};

const update = async (user, request) => {
  const raossunda = validate(updateRaossundaValidation, request);

  const totalraossundaInDatabase = await prismaClient.raosSunda.count({
    where: {
      username: user.username,
      id: raossunda.id,
    },
  });

  if (totalraossundaInDatabase !== 1) {
    throw new ResponseError(404, "raossunda is not found");
  }

  return prismaClient.raosSunda.update({
    where: {
      id: raossunda.id,
    },
    data: {
      makanan: raossunda.makanan,
      minuman: raossunda.minuman,
      paket_murah: raossunda.paket_murah,
      jumlah: raossunda.jumlah,
      harga: raossunda.harga,
    },
    select: {
      id: true,
      makanan: true,
      minuman: true,
      paket_murah: true,
      jumlah: true,
      harga: true,
    },
  });
};

const remove = async (user, raossundaId) => {
  raossundaId = validate(getRaossundaValidation, raossundaId);

  const totalInDatabase = await prismaClient.raosSunda.count({
    where: {
      username: user.username,
      id: raossundaId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, "raossunda is not found");
  }

  return prismaClient.raosSunda.delete({
    where: {
      id: raossundaId,
    },
  });
};

const search = async (user, request) => {
  request = validate(searchRaossundaValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  filters.push({
    username: user.username,
  });

  if (request.makanan) {
    filters.push({
      makanan: {
        contains: request.makanan,
      },
    });
  }
  if (request.minuman) {
    filters.push({
      minuman: {
        contains: request.minuman,
      },
    });
  }
  if (request.paket_murah) {
    filters.push({
      paket_murah: {
        contains: request.paket_murah,
      },
    });
  }

  const raossundas = await prismaClient.raosSunda.findMany({
    where: {
      AND: filters,
    },
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.raosSunda.count({
    where: {
      AND: filters,
    },
  });

  return {
    data: raossundas,
    paging: {
      page: request.page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

export default {
  create,
  get,
  update,
  remove,
  search,
};
