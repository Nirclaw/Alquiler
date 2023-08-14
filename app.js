import express from "express";
import { MyServer, PASSWORD } from "./config/config.js";
import appClientes from "./routers/clientes.js";
import appAlquiler from "./routers/alquiler.js";
import appReserva from "./routers/reserva.js";
import appEmpleados from "./routers/empleados.js";
import appSucursal from "./routers/sucursal.js";
import appAutomovil from "./routers/automoviles.js";
import { appGenerarToken, appValidarToken } from "./middleware/token/token.js";

const appExpres = express();

appExpres.use(express.json());

appExpres.use("/token", appGenerarToken);

appExpres.use("/clientes", appValidarToken, appClientes);
appExpres.use("/alquiler", appValidarToken, appAlquiler);
appExpres.use("/reserva", appValidarToken, appReserva);
appExpres.use("/empleados", appValidarToken, appEmpleados);
appExpres.use("/sucursal", appValidarToken, appSucursal);
appExpres.use("/automoviles", appValidarToken, appAutomovil);
appExpres.listen(MyServer, () => {
  console.log(`http://${MyServer.hostname}:${MyServer.port}`);
});
