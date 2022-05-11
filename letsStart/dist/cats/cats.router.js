"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cats_service_1 = require("./cats.service");
var cats_service_2 = require("./cats.service");
var router = express_1.Router();
router.get("/cats", cats_service_2.readAllCat);
router.get("/cats/:id", cats_service_2.readCat);
router.post("/cats", cats_service_2.createCat);
router.put("/cats/:id", cats_service_2.updateCat);
router.patch("/cats/:id", cats_service_2.updatePartialCat);
router.delete("/cats/:id", cats_service_1.deleteCat);
exports.default = router;
//# sourceMappingURL=cats.router.js.map