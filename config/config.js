import dotenv from "dotenv";
dotenv.config();

export const Ausuario = process.env.ALTAS_USUARIO;
export const Apass = process.env.ATLAS_PASS;
export const Adb = process.env.ATLAS_DB;
export const MyServer = JSON.parse(process.env.SERVER)
export const PASSWORD = process.env.PASSWORD
