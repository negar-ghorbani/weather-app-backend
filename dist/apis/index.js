"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autoComplete_1 = __importDefault(require("./autoComplete"));
const weather_1 = __importDefault(require("./weather"));
const router = express_1.default.Router();
router.get('/autoComplete', autoComplete_1.default);
router.get('/weather', weather_1.default);
exports.default = router;
