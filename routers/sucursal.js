import { Router } from "express";
import { mongo } from "../conexion/conexion.js";
import { limit } from "../middleware/limit/limit.js";
import { appValidarEstructuraSucursal } from "../middleware/sucursal/PostSucursalMDW.js";

let db = await mongo();
const appSucursal = Router();

appSucursal.use("/",limit(),appValidarEstructuraSucursal, async (req, res) => {
  let user = db.collection("sucursal");
  let data = await user
    .aggregate([
      {
        $lookup: {
          from: "sucursal_automovil",
          localField: "id_sucursal",
          foreignField: "id_sucursal",
          as: "fk_info_sucursal",
        },
      },
      {
        $unwind: "$fk_info_sucursal",
      },
      {
        $project: {
          _id: 0,
          "fk_info_sucursal._id": 0,
          "fk_info_sucursal.id_sucursal": 0,
          "fk_info_sucursal.id_automovil": 0,
        },
      },
    ])
    .toArray();
  res.send(data);
});
appSucursal.use("/cantidad-coches-sucursal",limit(),appValidarEstructuraSucursal, async (req, res) => {
  let user = db.collection("sucursal_automovil");
  let data = await user
    .aggregate([
      {
        $lookup: {
          from: "sucursal",
          localField: "id_sucursal",
          foreignField: "id_sucursal",
          as: "fk_nombre_sucursal",
        },
      },
      {
        $lookup: {
          from: "automovil",
          localField: "id_automovil",
          foreignField: "id_automovil",
          as: "coche_fk",
        },
      },
      {
        $unwind: "$fk_nombre_sucursal",
      },
      {
        $unwind: "$coche_fk",
      },
      {
        $project: {
          _id: 0,
          "fk_nombre_sucursal._id": 0,
          "coche_fk._id": 0,
          id_sucursal: 0,
          id_automovil: 0,
        },
      },
    ])
    .toArray();
  res.send(data);
});

export default appSucursal;
