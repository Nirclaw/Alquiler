import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import {  validate } from "class-validator";
import { PostReserva } from "../../controller/reserva.js";
import { Router} from "express";

const appReservaestructura = Router();
const appReservaDTO = Router();

appReservaestructura.use((req, res, next) => {
  if (!req.limit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;

  let clone = JSON.stringify(
    classToPlain(plainToClass(PostReserva, {}, { ignoreDecorators: true }))
  );

  let validar = clone === JSON.stringify(payload);

  !validar
    ? res.status(406).send({ status: 406, message: "No autorizado" })
    : next();
});

appReservaDTO.use(async (req, res, next) => {
  try {
    let data = plainToClass(PostReserva, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
    next()
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export {
    appReservaDTO,
    appReservaestructura
}
