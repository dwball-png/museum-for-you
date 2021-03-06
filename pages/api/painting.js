import axios from 'axios'

export default async function handler(req, res) {
    if (!req.query.obj) {
        res.statusCode = 400;
        res.json({error: "Bad request"});
        return;
    }
    const response = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${req.query.obj}`
    );
    res.statusCode = 200;
    res.json(response.data);
}