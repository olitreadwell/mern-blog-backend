import { MongoClient } from "mongodb";

let db;

async function connectToDb(callbackFn) {
    if (db) {
        // callbackFn(db);
        return callbackFn(db);
    }

    const client = await MongoClient.connect("mongodb://localhost:27017");

    db = client.db("react-blog-db");

    return callbackFn();
}

export { db, connectToDb };
