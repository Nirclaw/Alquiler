import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { validate } from "class-validator";
import { Router } from "express";
import { PostAutomovil } from "../../controller/automovil.js";

const appValidarEstruAutomovil = Router();
const appVeiculosDTO = Router();

appValidarEstruAutomovil.use((req, res, next) => {
  if (!req.rateLimit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;

  let clone = JSON.stringify(
    classToPlain(plainToClass(PostAutomovil, {}, { ignoreDecorators: true }))
  );

  let validar = clone === JSON.stringify(payload);
  !validar
    ? res.status(406).send({ status: 406, message: "No autorizado" })
    : next();
});

appVeiculosDTO.use(async (req, res, next) => {
  try {
    let data = plainToClass(PostAutomovil, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export { appValidarEstruAutomovil, appVeiculosDTO };
