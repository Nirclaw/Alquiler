import { Router } from "express";

import { mongo } from "../conexion/conexion.js";
import { limit } from "../middleware/limit/limit.js";
import { appReservaestructura } from "../middleware/reserva/reserva.js";

const appReserva = Router();

let db = await mongo();

appReserva.use("/pendientes",limit(),appReservaestructura, async (req, res) => {
  try {
    let user = db.collection("reserva");
    let data = await user
      .aggregate([
        {
          $match: {
            estado: "pendiente",
          },
        },
        {
          $lookup: {
            from: "cliente",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "fk_info_reserva_cliente",
          },
        },
        {
          $unwind: "$fk_info_reserva_cliente",
        },
        {
          $lookup: {
            from: "automovil",
            localField: "id_automovil",
            foreignField: "id_automovil",
            as: "fk_info_auto",
          },
        },
        {
          $unwind: "$fk_info_auto",
        },
        {
          $project: {
            _id: 0,
            "fk_info_reserva_cliente._id": 0,
            "fk_info_auto._id": 0,
          },
        },
      ])
      .toArray();
    res.send(data);
  } catch (error) {
    res.status(401).send(error);
  }
});

appReserva.use("/pendiente/cliente",limit(),appReservaestructura, async (req, res) => {
  try {
    let user = db.collection("cliente");
    let data = await user.aggregate([
        {
          $lookup: {
            from: "reserva",
            localField: "id_cliente",
            foreignField: "id_cliente",
            as: "fk_info_reservas",
          },
        },
        {
          $unwind: "$fk_info_reservas",
        },
        {
          $match: {
            $and: [
              { id_cliente: { $in: [req.body.id] } },
              { "fk_info_reservas.estado": { $in: ["pendiente"] } },
            ],
          },
        },
        {
          $project: {
            "fk_info_reservas._id": 0,
            _id: 0,
          },
        },
      ])      .toArray();
    res.send(data);
  } catch (error) {
    res.status(401).send(error);
  }
});

export default appReserva;
