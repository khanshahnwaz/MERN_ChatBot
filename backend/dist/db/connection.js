import { connect, disconnect } from 'mongoose';
// connect function to connect mongo db database
export default async function connectTODatabase() {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error('Please define the MONGODB_URI environment variable');
          }
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        // console.log(error)
        throw new Error("Cannot connect to mongodb, error ", error);
    }
}
// if anything happens then disonnect from database
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) { }
}
export { connectTODatabase, disconnectFromDatabase };
//# sourceMappingURL=connection.js.map