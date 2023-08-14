import { Router } from "express";
import "reflect-metadata";
import { PostSucursal } from "../../controller/sucursal.js";
import { classToPlain, plainToClass } from "class-transformer";
import { validate } from "class-validator";

const appValidarEstructuraSucursal = Router();
const appDTOSucursal = Router();

appValidarEstructuraSucursal.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;

  let clone = JSON.stringify(
    classToPlain(plainToClass(PostSucursal, {}, { ignoreDecorators: true }))
  );

  let validar = clone === JSON.stringify(payload);
  !validar
    ? res.status(406).send({ status: 406, message: "No autorizado" })
    : next();
});

appDTOSucursal.use(async (req, res, next) => {
  try {
    let data = plainToClass(PostSucursal, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export { appValidarEstructuraSucursal, appDTOSucursal };
