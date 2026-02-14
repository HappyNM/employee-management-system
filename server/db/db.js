import mongoose from "mongoose";

const globalCache = global
if (!globalCache._mongooseConnection) {
    globalCache._mongooseConnection = { conn: null, promise: null }
}

const connectToDatabase = async () => {
    if (globalCache._mongooseConnection.conn) {
        return globalCache._mongooseConnection.conn
    }

    if (!process.env.MONGODB_URL) {
        throw new Error("MONGODB_URL is not set")
    }

    if (!globalCache._mongooseConnection.promise) {
        globalCache._mongooseConnection.promise = mongoose
            .connect(process.env.MONGODB_URL)
            .then((mongooseInstance) => mongooseInstance)
    }

    globalCache._mongooseConnection.conn = await globalCache._mongooseConnection.promise
    return globalCache._mongooseConnection.conn
}

export default connectToDatabase