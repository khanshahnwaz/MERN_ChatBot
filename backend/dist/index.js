import app from "./app.js";
import connectTODatabase from "./db/connection.js";
// connections
const PORT = process.env.PORT || 5000;
try {
    connectTODatabase().then(() => {
        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    }).catch((err) => { console.error(err); });
}
catch (err) {
    console.error('Error during server startup:', err);
}
//# sourceMappingURL=index.js.map