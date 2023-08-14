import { Router } from "express";
import { mongo } from "../conexion/conexion.js";
import { limit } from "../middleware/limit/limit.js";
import {
  appDTO,
  appValidarEstructura,
} from "../middleware/cliente/postClienteMDW.js";
import { PostCliente } from "../controller/cliente.js";
const appClientes = Router();

let db = await mongo();

appClientes.get("/", limit(), appValidarEstructura, async (req, res) => {
  let user = db.collection("cliente");
  let data = await user.find().toArray();
  res.send(data);
});

appClientes.get("/id", limit(),appValidarEstructura, async (req, res) => {
  let user = db.collection("cliente");
  let data = await user
    .aggregate([
      {
        $match: {
          dni: { $in: [req.body.id] },
        },
      },
    ])
    .toArray();
  res.send(data);
});

appClientes.post(
  "/create",
  limit(),
  appValidarEstructura,
  appDTO,
  async (req, res) => {
    try {
      let user = db.collection("cliente");
      let data = await user.insertOne(req.body);
      res
        .status(201)
        .send({ status: 201, message: "creado con exito", data: data });
    } catch (error) {
      let inst = new PostCliente();
      let errores = inst.alert(error);
      res.status(400).send(errores);
    }
  }
);
export default appClientes;
