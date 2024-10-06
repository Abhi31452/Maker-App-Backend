"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = (0, express_1.default)();
app.listen(process.env.PORT, () => {
    console.log(" Server Running in port  : ", process.env.port);
});
app.get("/", (req, res) => {
    console.log(" Welcopme ");
});
//# sourceMappingURL=index.js.map