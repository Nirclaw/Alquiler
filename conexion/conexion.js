import { MongoClient } from "mongodb";
import { Adb, Apass, Ausuario } from "../config/config.js";

export async function mongo() {
  try {
    const uri = `mongodb+srv://${Ausuario}:${Apass}@cluster0.hoapju2.mongodb.net/${Adb}`;
    const option = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = await MongoClient.connect(uri, option);
    return client.db();
  } catch (error) {
    return { status: 401, message: error };
  }
}
