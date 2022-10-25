const moment = require('moment/moment');
const Queue = require('../models/Queue')

//joining a queue
const joinQueue = async (req, res) => {

    const stationId = req.body.stationId;
    const vehicleId = req.body.vehicleId;
    const vehicleType = req.body.vehicleType;
    const joined = moment(req.body.joined).format("YYYY-MM-DD HH:mm");
    const status = req.body.status;
   

    const queueJoin = new Queue({
        stationId,
        vehicleId,
        vehicleType,
        joined,
        status,
    })


    try {
        const joinedQueue = await Queue.findOne({vehicleId:vehicleId})
        if(joinedQueue){
            if(joinedQueue.status == "Joined to the queue" ){
                return res.json({ data: joinedQueue.stationId });
            }else{
                // return res.json({ data: "Haven't joined to a queue yet" });
                const updatejoinedDetails = {
                    stationId:stationId,
                    vehicleId:vehicleId,
                    vehicleType:vehicleType,
                    joined:joined,
                    exit:" ",
                    status:status
                
                }
                    try {
                        const response = await Queue.findOneAndUpdate({ stationId: stationId, vehicleId:vehicleId }, updatejoinedDetails);
                        if (response) {
                            return res.json({ data: 'Details Updated' });
                        } else {
                            return res.status(500).send({ data: 'Internal server error' });
                        }
        
                    } catch (err) {
                        return res.status(400).send({ data: 'Update Failed' })
                    }
                
            }
           
        }else{
            try {
            let response = await queueJoin.save();
            if (response) {
                return res.json({ data: 'Joined the Queue' });
            } else {
                return res.status(500).send({ data: 'Internal server error' });
            }
        } catch (err) {
            console.log(err);
            return res.status(400).send({ data: 'Error !!' })
        }
            
        }
    } catch (error) {
        return res.status(500).send({ data: 'Internal server error' });
    }
}

//update joining queue details
const updateQueueDetails = async (req, res) => {

    const stationId = req.params.stationId;
    const vehicleId = req.params.vehicleId;
    const joined = moment(req.body.joined).format("YYYY-MM-DD HH:mm");
    const exit = moment(req.body.exit).format("YYYY-MM-DD HH:mm");
    const status = req.body.status;
   
    const joinedVehicle = await Queue.findOne({ stationId: stationId, vehicleId:vehicleId });

    if(joinedVehicle){

        const updatejoinedDetails = {
            stationId:stationId,
            vehicleId:vehicleId,
            vehicleType:joinedVehicle.vehicleType,
            joined:joinedVehicle.joined || joined,
            exit:exit,
            status:status
        
        }
            try {
                const response = await Queue.findOneAndUpdate({ stationId: stationId, vehicleId:vehicleId }, updatejoinedDetails);
                if (response) {
                    return res.json({ message: 'Details Updated' });
                } else {
                    return res.status(500).send({ message: 'Internal server error' });
                }

            } catch (err) {
                return res.status(400).send({ message: 'Update Failed' })
            }
   }
}

//view queue size
const getLatestQueueLength = async (req, res) => {

    const stationId = req.params.stationId;

    const vehicleDocs = await Queue.find({stationId:stationId})

    const currentDate = moment().format("YYYY-MM-DD")

    let queuelength =0;

    vehicleDocs.forEach(vehicle=>{
        const date = moment(vehicle.joined).format("YYYY-MM-DD");
        if(vehicle.status == 'Joined to the queue'){
            queuelength ++;
        }
    })

    try {
        return res.json({data:queuelength});
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

//view queue size by vehicleType
const getLatestQueueLengthByVehicleType = async (req, res) => {

    const stationId = req.params.stationId;
    const vehicle = req.params.vehicleType;

    const vehicleDocs = await Queue.find({stationId:stationId, vehicleType: vehicle})

    const currentDate = moment().format("YYYY-MM-DD")

    let queuelength =0;

    vehicleDocs.forEach(vehicle=>{
        const date = moment(vehicle.joined).format("YYYY-MM-DD");
        if(vehicle.status == 'Joined to the queue'){
            queuelength ++;
        }
    })

    try {
        return res.json({ data: queuelength });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

//view the total waiting time in the queue
const queueWaitingTime = async (req, res) => {

    const stationId = req.params.stationId;
    
    const vehicleDocs = await Queue.find({stationId:stationId})

    let joinedTimeArray = [];

    vehicleDocs.forEach(vehicle=>{
        if(vehicle.status == 'Joined to the queue'){
            joinedTimeArray.push(vehicle.joined)
        }
    })

    joinedTimeArray = joinedTimeArray.sort();

    const startTime = moment(joinedTimeArray[0]);
    const currentDate = moment()
    const waitingPeriod = currentDate.diff(startTime, "minutes")
    let wait;

    if(waitingPeriod > 60){
        const hours = waitingPeriod / 60
        wait = `${(hours).toFixed(2)} hours`
    }

    try {
        return res.json({ data: wait });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}

//check vehicle joined a queue or not
const checkJoinedQueue = async (req, res) => {

    const vehicleId = req.params.vehicleId;
    try {
        const joinedQueue = await Queue.findOne({vehicleId:vehicleId})
        if(joinedQueue){
            if(joinedQueue.status == "Joined to the queue" ){
                return res.json({ data: joinedQueue.stationId });
            }else{
                return res.status(200).send({ data: "Haven't joined to a queue yet" });
            }
           
        }else{
            return res.status(200).send({ data: "Haven't joined to a queue yet" });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
}


module.exports = {
    joinQueue,
    updateQueueDetails,
    getLatestQueueLength,
    getLatestQueueLengthByVehicleType,
    queueWaitingTime,
    checkJoinedQueue
};