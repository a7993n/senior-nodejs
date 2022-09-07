const axios = require('axios');
require('dotenv').config();
const pollutions = require('../models/pollution');

class Pollution {

    //GET /pollution/all - get pollution data from database
    static async getPollution(req, res) {
        try {
            const pollution = await pollutions.findAll();
            res.status(200).json(pollution);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Cron job displaying Paris pollution every minute

        

    //GET /pollution/ - get pollution data by longitude and latitude
    static async byLongLat(req, res) {
    const { longitude, latitude } = req.params;
    const { data } = await axios.get(`https://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=${process.env.API_KEY}`);
    const { data: { current: { pollution } } } = data;
    const { aqius, mainus, aqicn, maincn } = pollution;
    const ts = new Date();
    const newPollution = await pollutions.create({ ts, aqius, mainus, aqicn, maincn });
    res.status(200).json(newPollution);
}

}

module.exports = Pollution;