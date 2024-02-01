import { logger } from "../application/logging.js";
import raossundaService from "../service/raossunda-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await raossundaService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const user = req.user;
    const raossundaId = req.params.raosSundaId;
    const result = await raossundaService.get(user, raossundaId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.user;
    const raossundaId = req.params.raosSundaId;
    const request = req.body;
    request.id = raossundaId;

    const result = await raossundaService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const user = req.user;
    const raossundaId = req.params.raosSundaId;

    await raossundaService.remove(user, raossundaId);
    res.status(200).json({
      data: "ok",
    });
  } catch (e) {
    next(e);
  }
};

const search = async (req, res, next) => {
  try {
    logger.info(req, query);

    const user = req.user;
    const request = {
      makanan: req.query.makanan,
      minuman: req.query.minuman,
      paket_murah: req.query.paket_murah,
      Jumlah: req.query.Jumlah,
      harga: req.query.harga,
    };

    const result = await raossundaService.search(user, request);
    res.status(200).json({
      data: result.data,
      paging: result.paging,
    });
  } catch (e) {
    next(e);
  }
};
export default {
  create,
  get,
  update,
  remove,
  search,
};
