import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("ENV:", process.env.DB_SERVICE, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);

        const uri = `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        
        console.log("URI generada:", uri);

        if (!uri) throw new Error("URI de MongoDB no definida.");

        await mongoose.connect(uri, {
            maxPoolSize: 50, 
            serverSelectionTimeoutMS: 5000 
        });

        console.log("Conectado a MongoDB correctamente");

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error.message);
        process.exit(1);
    }
};