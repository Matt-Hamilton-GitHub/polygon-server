const { default: mongoose } = require('mongoose');
const CabinSchema = require('../models/Cabin');
const Cabin = require('../models/Cabin');


exports.getAllCabins = async (req, res)=> {

      try {
            const cabins = await CabinSchema.find();
            res.json(cabins);
        } catch (err) {
            res.status(500).send('SERVER ERROR @ GET-ALL-CABINS')
        }
    }

exports.addNewCabin = async (req, res) => {
    try {
        const { cabinName, cabinPrice, cabinDescription, cabinImageUrl, cabinTags } = req.body

        const newCabin = new Cabin({
            name: cabinName,
            price: cabinPrice,
            description: cabinDescription,
            imageUrl: cabinImageUrl,
            tags: cabinTags,
        })

        await newCabin.save();
        return res.status(200).send('New Cabin Added')
    } catch (err) {
        return res.status(500).send(err)
    }
}