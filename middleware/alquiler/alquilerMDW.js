import "reflect-metadata";
import { PostAlquier } from "../../controller/alquier.js";
import { Router } from "express";
import { Validate, validate } from "class-validator";
import { classToPlain, plainToClass } from "class-transformer";

const appValidarEstrucAlquiler = Router();
const appDtoAlquiler = Router();

appDtoAlquiler.use((req, res, next) => {
  if (req.limit) return;

  let { payload } = req.body;

  const { iat, exp, ...newPayload } = payload;

  payload = newPayload;

  let clone = JSON.stringify(
    classToPlain(plainToClass(PostAlquier, {}, { ignoreDecorators: true }))
  );

  let validar = clone === JSON.stringify(payload);

  !validar
    ? res.status(406).send({ status: 406, message: "No autorizado" })
    : next();
});

appDtoAlquiler.use(async (req, res, next) => {
  try {
    let data = plainToClass(PostAlquier, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next();
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export {
    appDtoAlquiler,
    appValidarEstrucAlquiler
}