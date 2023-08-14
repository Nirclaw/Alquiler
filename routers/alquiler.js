import { Router } from "express";

import { mongo } from "../conexion/conexion.js";
import { limit } from "../middleware/limit/limit.js";
import { appValidarEstrucAlquiler } from "../middleware/alquiler/alquilerMDW.js";
let db = await mongo();

export const appAlquiler = Router();

appAlquiler.get("/", limit(), appValidarEstrucAlquiler, async (req, res) => {
  try {
    let user = db.collection("alquiler");
    let data = await user.find({ estado: "inactivo" }).toArray();
    res.send(data);
  } catch (error) {
    res.status(401).send({ status: 401, message: error });
  }
});

appAlquiler.get(
  "/activos",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user.find({ estado: "inactivo" }).toArray();
    res.send(data);
  }
);

appAlquiler.get(
  "/detalles",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user
      .find({ id_alquiler: { $in: [req.body.id] } })
      .toArray();
    res.send(data);
  }
);

appAlquiler.get(
  "/costo",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user
      .aggregate([
        {
          $match: {
            id_alquiler: { $in: [req.body.id] },
          },
        },
        {
          $project: {
            _id: 0,
            fecha_fin: 0,
            fecha_inicio: 0,
            estado: 0,
            id_automovil: 0,
          },
        },
      ])
      .toArray();
    res.send(data);
  }
);

appAlquiler.get(
  "/fecha",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user
      .aggregate([
        {
          $match: {
            fecha_inicio: { $in: [req.body.fecha] },
          },
        },
      ])
      .toArray();
    res.send(data);
  }
);
appAlquiler.get(
  "/clientes-registrados",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user
      .aggregate([
        {
          $lookup: {
            from: "cliente",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "fk_cliente_registro",
          },
        },
        {
          $project: {
            _id: 0,
            "fk_cliente_registro._id": 0,
          },
        },
      ])
      .toArray();
    res.send(data);
  }
);

appAlquiler.get(
  "/cantidad-alquileres",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user.countDocuments();
    res.send({ cantidad: data.toString() });
  }
);

appAlquiler.get(
  "/alquiler-fecha-inicio-fin",
  limit(),
  appValidarEstrucAlquiler,
  async (req, res) => {
    let user = db.collection("alquiler");
    let data = await user
      .aggregate([
        {
          $match: {
            $and: [
              { fecha_inicio: { $gte: req.body.fecha_inicio } },
              { fecha_fin: { $lte: req.body.fecha_fin } },
            ],
          },
        },
      ])
      .toArray();
    res.send(data);
  }
);

export default appAlquiler;
