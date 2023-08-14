import "reflect-metadata";
import { Router } from "express";
import { validate } from "class-validator";
import { postSucursalAutos } from "../../controller/sucursal_automovil";
import { plainToClass } from "class-transformer";

const appSucursalAuto = Router();
const appDtoAutosucursal = Router();

appDtoAutosucursal.use((req, res, next) => {
  if (!req.limit) return;
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;

  let clone = JSON.stringify(
    classToPlain(
      plainToClass(postSucursalAutos, {}, { ignoreDecorators: true })
    )
  );

  let validar = clone === JSON.stringify(payload);
  !validar
    ? res.status(406).send({ status: 406, message: "No autorizado" })
    : next();
});

appDtoAutosucursal.use(async (req, res, next) => {
  try {
    let data = plainToClass(postSucursalAutos, req.body);
    await validate(data);
    req.body = JSON.parse(JSON.stringify(data));
    req.data = undefined;
  } catch (error) {
    res.status(error.status).send(error);
  }
});

export{
    appDtoAutosucursal,
    appSucursalAuto
}
