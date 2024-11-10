import app from "./app.js";
import connectTODatabase from "./db/connection.js";
// connections
const PORT = process.env.PORT || 5000;
connectTODatabase().then(() => {
    // connections and listeners
    app.listen(PORT, () => console.log("Server running 5000 and connected to database"));
}).catch((err) => { console.log(err); });
//# sourceMappingURL=index.js.map