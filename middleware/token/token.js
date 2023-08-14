import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import { PostCliente } from "../../controller/cliente.js";
import { PASSWORD } from "../../config/config.js";
import { PostSucursal } from "../../controller/sucursal.js";
import { postSucursalAutos } from "../../controller/sucursal_automovil.js";
import { PostReserva } from "../../controller/reserva.js";
import { PostAlquier } from "../../controller/alquier.js";
import { PostAutomovil } from "../../controller/automovil.js";
import { PostEmpleado } from "../../controller/empleados.js";

const appGenerarToken = Router();
const appValidarToken = Router();

const createEsctructure = (className) => {
  const instaClass = {
    cliente: PostCliente,
    sucursal: PostSucursal,
    sucursalAutomovil: postSucursalAutos,
    reserva: PostReserva,
    alquiler: PostAlquier,
    automovil: PostAutomovil,
    empleado: PostEmpleado,
  };
  const peticion = instaClass[className];

  return peticion
    ? plainToClass(peticion, {}, { ignoreDecorators: true })
    : undefined;
};

appGenerarToken.use("/:colletion", async (req, res) => {
  try {
    const collection = req.params.colletion;
    const inst = createEsctructure(collection);

    if (!inst)
      return res
        .status(401)
        .send({ status: 401, message: "la coleccion no existe" });

    const encoder = new TextEncoder();
    const createJwt = new SignJWT(Object.assign({}, classToPlain(inst)));
    const TOKEN = await createJwt
      .setProtectedHeader({ alg: "HS256", typ: "JTW" })
      .setIssuedAt()
      .setExpirationTime("30min")
      .sign(encoder.encode(PASSWORD));
    req.data = TOKEN;
    res.status(201).send({ status: 201, message: TOKEN });
  } catch (error) {
    res
      .status(404)
      .send({ status: 201, message: "el token no se ha podido generar" });
  }
});

appValidarToken.use("/", async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).send({ status: 400, message: "TOKEN no ingresado" });
  try {
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(authorization, encoder.encode(PASSWORD));
    req.data = jwtData;
    next();
  } catch (error) {
    res.status(498).send({ status: 498, message: "Token caducado" });
  }
});

export { appGenerarToken, appValidarToken };
