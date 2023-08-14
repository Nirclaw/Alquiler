import { Router } from "express";

import { mongo } from "../conexion/conexion.js";
import { limit } from "../middleware/limit/limit.js";
import { appValidarEstruAutomovil } from "../middleware/automovil/automovilMDW.js";

let db = await mongo();

const appAutomovil = Router();

appAutomovil.get("/capacidad",limit(),appValidarEstruAutomovil, async (req, res) => {
  let user = db.collection("automovil");
  let data = await user
    .aggregate([
      {
        $match: {
          capacidad: { $gte: 5 },
        },
      },
    ])
    .toArray();
  res.send(data);
});
appAutomovil.get("/marca-modelo",limit(),appValidarEstruAutomovil, async (req, res) => {
  let user = db.collection("automovil");
  let data = await user
    .aggregate([
      {
        $project: {
          _id: 0,
          id_automovil: 0,
          anio: 0,
          tipo: 0,
          capacidad: 0,
          precio_diario: 0,
          id_automovil: 0,
        },
      },
    ])
    .toArray();
  res.send(data);
});

export default appAutomovil;
