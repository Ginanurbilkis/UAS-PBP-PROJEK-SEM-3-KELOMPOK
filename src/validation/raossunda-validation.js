import Joi from "joi";

const createRaossundaValidation = Joi.object({
  makanan: Joi.string().max(100).required(),
  minuman: Joi.string().max(100).required(),
  paket_murah: Joi.string().max(200).required(),
  Jumlah: Joi.string().max(20).required(),
  Harga: Joi.string().max(20).required(),
});

const getRaossundaValidation = Joi.number().positive().required();

const updateRaossundaValidation = Joi.object({
  id: Joi.number().positive().required(),
  makanan: Joi.string().max(100).required(),
  minuman: Joi.string().max(100).required(),
  paket_murah: Joi.string().max(200).required(),
  Jumlah: Joi.string().max(20).required(),
  Harga: Joi.string().max(20).required(),
});

const searchRaossundaValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  makanan: Joi.string().optional(),
  minuman: Joi.string().optional(),
  paket_murah: Joi.string().optional(),
});

export {
  createRaossundaValidation,
  getRaossundaValidation,
  updateRaossundaValidation,
  searchRaossundaValidation,
};
