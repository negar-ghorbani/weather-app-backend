"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getConfig = (data) => {
    return {
        method: 'get',
        url: `https://api.open-meteo.com/v1/forecast`,
        params: {
            latitude: data.lat,
            longitude: data.lon,
            temperature_unit: data.unit,
            current_weather: true,
            hourly: 'temperature_2m,apparent_temperature,precipitation,cloudcover,windspeed_10m,winddirection_10m'
        },
        headers: {}
    };
};
// const zip = (...arr: string[] | number[]) => Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]));
const objectify = (data) => {
    return {
        time: data.time,
        temperature_2m: data.temperature_2m,
        apparent_temperature: data.apparent_temperature,
        precipitation: data.precipitation,
        cloudcover: data.cloudcover,
        windspeed_10m: data.windspeed_10m,
        winddirection_10m: data.winddirection_10m
    };
};
const parser = (res) => {
    return { hourly: objectify(res.hourly), current_weather: res.current_weather };
};
const weatherAPI = async (req, res) => {
    const queryParams = req.query;
    if (!queryParams.latitude || !queryParams.longitude) {
        res.status(400).json({ error: 'Location not found' });
        return;
    }
    console.log(req.query.unit);
    (0, axios_1.default)(getConfig({
        lat: queryParams.latitude,
        lon: queryParams.longitude,
        unit: queryParams.unit ? queryParams.unit : 'celsius'
    }))
        .then(function (response) {
        res.json(parser(response.data));
    })
        .catch(function (error) {
        res.send(error);
    });
};
exports.default = weatherAPI;
