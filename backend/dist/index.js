import app from "./app.js";
import connectTODatabase from "./db/connection.js";
// connections
const PORT = process.env.PORT || 5000;
connectTODatabase().then(() => {
    // connections and listeners
    if (process.env.NODE_ENV !== 'production') {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}).catch((err) => { console.log(err); });
//# sourceMappingURL=index.js.map