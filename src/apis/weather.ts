import axios from 'axios';
import { Request, Response } from "express";

const getConfig = (data: requestData) => {
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
}
type requestData = {
    lat: string,
    lon: string,
    unit: string
}
interface IQueryParams  {
    latitude: string,
    longitude: string,
    unit: string
}
type currentWeather = {
    time: string,
    temperature: number,
    weathercode: number,
    windspeed: number,
    winddirection: number
}

type json = {
    latitude: string,
    longitude: string,
    current_weather: currentWeather,
    hourly: hourly,
}
type hourly = {
    time: string[],
    temperature_2m: number[],
    apparent_temperature: number[],
    precipitation: number[],
    cloudcover: number[],
    windspeed_10m: number[],
    winddirection_10m: number[]

}
// const zip = (...arr: string[] | number[]) => Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]));

const objectify = (data: hourly) => {
    return {
        time: data.time,
        temperature_2m: data.temperature_2m,
        apparent_temperature: data.apparent_temperature,
        precipitation: data.precipitation,
        cloudcover: data.cloudcover,
        windspeed_10m: data.windspeed_10m,
        winddirection_10m: data.winddirection_10m
    }
}
const parser = (res: json) => {
    return { hourly: objectify(res.hourly), current_weather: res.current_weather };
}

const weatherAPI = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as IQueryParams;
    if (!queryParams.latitude || !queryParams.longitude) {
        res.status(400).json({ error: 'Location not found' });
        return;
    }
    console.log(req.query.unit);
    axios(getConfig({
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

export default weatherAPI;