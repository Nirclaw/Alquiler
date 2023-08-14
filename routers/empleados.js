import { Router } from "express";
import { mongo } from "../conexion/conexion.js";
import { limit } from "../middleware/limit/limit.js";
import { appValidarEstructuraEmpleado } from "../middleware/empleados/empleadoMDW.js";

let db = await mongo();

const appEmpleados = Router();

appEmpleados.get("/cargo/vendedor",limit(),appValidarEstructuraEmpleado, async (req, res) => {
  let user = db.collection("empleado");
  let data = await user
    .aggregate([
      {
        $match: {
          cargo: { $in: ["vendedor"] },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ])
    .toArray();
  res.send(data);
});
appEmpleados.get("/cargo/asi&gere",limit(),appValidarEstructuraEmpleado, async (req, res) => {
  let user = db.collection("empleado");
  let data = await user
    .aggregate([
      {
        $match: {
          $or: [{ cargo: "asistente" }, { cargo: "gerente" }],
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ])
    .toArray();
  res.send(data);
});

export default appEmpleados;
