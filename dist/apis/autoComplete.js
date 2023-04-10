"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getConfig = (text) => {
    return {
        method: 'get',
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${process.env.GEOAPIFY_API_KEY}`,
        headers: {}
    };
};
const objectify = (data) => {
    return {
        name: [data.city, data.county, data.country].filter(item => item).join(", "),
        lon: data.lon,
        lat: data.lat
    };
};
const parser = (res) => {
    const result = [];
    res.features.forEach(element => result.push(objectify(element.properties)));
    return result;
};
const autoCompleteAPI = async (req, res) => {
    const queryParams = req.query;
    if (!queryParams.location) {
        res.status(400).json({ error: 'Location not found' });
        return;
    }
    (0, axios_1.default)(getConfig(queryParams.location))
        .then(function (response) {
        res.json(parser(response.data));
    })
        .catch(function (error) {
        res.send(error);
    });
};
exports.default = autoCompleteAPI;
