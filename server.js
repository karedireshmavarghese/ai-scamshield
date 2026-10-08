const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {

    res.json({
        status: "online",
        message: "AI ScamShield server is running"
    });

});


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`
====================================
       AI SCAMSHIELD SERVER
====================================

Server running at:
http://localhost:${PORT}

Health check:
http://localhost:${PORT}/api/health

====================================
    `);

});
