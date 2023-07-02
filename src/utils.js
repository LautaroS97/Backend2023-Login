import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { connect } from "mongoose";

export default __dirname;

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://lautaroSettembriniBackend:4815162342@backend2023coder.mvmxir8.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Conectado a MongoDB");
  } catch (e) {
    console.log(e);
    throw new Error("Error al establecer la conexión");
  }
}