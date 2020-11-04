import { connect, ConnectionOptions } from "mongoose";
import User from "./User";
import Company from "./Company";

// Connection options
const connectionOptions: ConnectionOptions = {
    dbName: "restaurant",
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Connection strings
const connectionString: string = "mongodb://127.0.0.1:27017/";

// Connection
connect(connectionString, connectionOptions);

export default {
    User,
    Company,
}
