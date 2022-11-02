const moment = require('moment/moment');
const Station = require('../models/Station')

//station creation
const create = async (req, res) => {

    const id = req.body.id;
    const name = req.body.name;
    const address = req.body.address;
    const phone = req.body.phone;
    const email = req.body.email;
    const fuel = req.body.fuel;
 
    const station = new Station({
        id,
        name,
        address,
        phone,
        email,
        fuel,
    })

    try {
        let response = await station.save();
        if (response) {
            return res.status(201).send({ message: 'Station added' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Error !!' })
    }

}

//view specific station
const viewOneStation = async (req, res) => {
    let id = req.params.id;
    try {
        let response = await Station.findOne({ id: id });
        if (response) {
            return res.status(200).send({ data: response });
        } else {
            return res.status(404).send({ message: 'Not Found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}


//view all stations
const viewAllStations = async (req, res) => {
    try {
        const response = await Station.find();
        return res.status(200).send({data: response});
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

//station owner update fuel details
const updateFuelDetails = async (req, res) =>{
    const id = req.params.id;
    const fuelType = req.params.fuelType;
    let completeTime;

    const arrivalTime  = moment(req.body.arrival).format("YYYY-MM-DD HH:mm");
   
    if(req.body.complete == " " || null){
        completeTime = " "
    }else {
        completeTime = moment(req.body.complete).format("YYYY-MM-DD HH:mm")
    }
   
    const status = req.body.status;

    console.log(req.body.arrival, completeTime)

    try {
        let station = await Station.findOne({ id: id });
        if (station) {

            let fuelArray = station.fuel;
            let fuelId ;

            fuelArray.forEach(fuel=>{
                if(fuel.type == fuelType){
                    fuelId = fuel._id;
                    fuelArray.remove(fuel);
                }     
            })

            const fuelDetails = {
                type: fuelType,
                arrival: arrivalTime,
                complete: completeTime,
                status:status,
                _id: fuelId
            }
        
            fuelArray.push(fuelDetails)
            fuelArray.sort(function(a, b) {
                var textA = a.type.toUpperCase();
                var textB = b.type.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            
            const StationUpdated = {
                id:station.id,
                name:station.name,
                address:station.address,
                phone:station.phone,
                email:station.email,
                fuel:fuelArray
            } 

            try {
                const response = await Station.findOneAndUpdate({ id: id }, StationUpdated);
                if (response) {
                    return res.json({ message: 'Updated' });
                } else {
                    return res.status(500).send({ message: 'Internal server error' });
                }

            } catch (err) {
                return res.status(400).send({ message: 'No station' })
            }

        } else {
            return res.status(404).send({ message: 'Not Found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }

}

//view fuel details in a specific station
const viewFuelInOneStation = async (req, res) => {
    let id = req.params.id;

    try {
        let response = await Station.findOne({ id: id });
        if (response) {
            let data = response.fuel
            return res.json({data});
        } else {
            return res.status(404).send({ message: 'Not Found' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

//Search for Stations by name
const searchStations = async (req, res) =>{

    let val =req.params.name;

     Station.find({name :{$regex: ".*" + val + ".*", $options:'i'}}).then((stations) =>{
        return res.status(200).send({data: stations});
 
     }).catch((err)=>{
         console.log(err);
     })
}


module.exports = {
   create,
   viewAllStations,
   viewOneStation,
   updateFuelDetails,
   viewFuelInOneStation,
   searchStations
};