import axios, { responseEncoding } from 'axios';
import { Request, Response } from "express";

const getConfig = (text: string) => {
    return {
        method: 'get',
        url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${process.env.GEOAPIFY_API_KEY}`,
        headers: {}
    };
}

type properties = {
    name: string,
    country: string,
    county: string,
    city: string,
    lon: string,
    lat: string
}
type propertiesRes = {
    name: string,
    lon: string,
    lat: string
}
interface IQueryParams {
    location: string
}
type features = {
    properties: properties
}
type json = {
    features: features[]
}

const objectify = (data: properties) => {
    return {
        name: [data.city, data.county, data.country].filter(item => item).join(", "),
        lon: data.lon,
        lat: data.lat
    }
}
const parser = (res: json) => {
    const result: propertiesRes[] = [];
    res.features.forEach(element => result.push(objectify(element.properties)))
    return result;

}

const autoCompleteAPI = async (req: Request, res: Response) => {
    const queryParams = req.query as unknown as IQueryParams;
    if (!queryParams.location) {
        res.status(400).json({ error: 'Location not found' });
        return;
    }
    axios(getConfig(queryParams.location))
        .then(function (response) {
            res.json(parser(response.data));
        })
        .catch(function (error) {
            res.send(error);
        });
};

export default autoCompleteAPI;