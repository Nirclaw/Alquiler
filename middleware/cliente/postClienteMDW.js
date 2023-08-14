import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { PostCliente } from "../../controller/cliente.js";
import { Router } from "express";

const appValidarEstructura = Router();
const appDTO = Router();

appValidarEstructura.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;

  let clone = JSON.stringify(
    classToPlain(plainToClass(PostCliente, {}, { ignoreDecorators: true }))
  );

  let validar = clone === JSON.stringify(payload);
  !validar
    ? res.status(406).send({ status: 406, message: "No autorizado" })
    : next();
});

appDTO.use(async (req, res, next) => {
  try {
    let data = plainToClass(PostCliente, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export { appValidarEstructura, appDTO };
