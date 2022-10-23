const bcrypt = require('bcryptjs');
const { request } = require('express');
const auth = require('../middlewares/jwt')
const User = require('../models/User')

//user registration
const register = async (req, res) => {

    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const pwd = req.body.password;
    const type = req.body.type;
    const vehicleType =req.body.vehicleType;
    const vehicleId =req.body.vehicleId;
    const station = req.body.station;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pwd, salt);

    const user = new User({
        name,
        phone,
        email,
        password,
        type,
        station,
        vehicleType,
        vehicleId
        
    })

    try {
        let response = await user.save();
        if (response) {
            return res.status(201).send({ message: 'New User registered' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Registration Error !!' })
    }

}

//user login
const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    try {
        const user = await User.findOne({ email: email });
        if (user) {

            if (user && bcrypt.compareSync(password, user.password)) {
                const token = auth.generateAccessToken(email);
                // call toJSON method applied during model instantiation
                return res.json({...user.toJSON(), token});
            }
            else {
                return res.status(400).send({ message: 'Incorrect Credentials' })
            }
        } else {
            return res.status(404).send({ message: 'Such user does not exist' });
        }
    } catch (err) {
        return res.status(400).send({ message: 'Such user does not exist check your credentials' })
    }

}

//view users 
const getAllUsers = async (req, res) => {

    try {
        let users = await User.find();
        if (users) {
            // return res.json(users)
            return res.status(200).send(users)
        } else {
            return res.status(404).send({ message: 'No users available' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}

//update the forgotten password
const updateUserPassword = async (req, res) => {
    const email = req.params.email;
    const password = req.params.pwd;

    try {
        const user = await User.findOne({ email });
        if (user) {
            const salt = bcrypt.genSaltSync(10);
            const updatePassword = bcrypt.hashSync(password, salt);

            const newUser = {
                name: user.name,
                phone: user.phone,
                email: user.email,
                type: user.type,
                password:updatePassword,
            }

            try {
                const response = await User.findOneAndUpdate({ email: email }, newUser);
                if (response) {
                    return res.status(200).send({ message: 'Password Updated' });
                } else {
                    return res.status(500).send({ message: 'Internal server error' });
                }

            } catch (err) {
                return res.status(400).send({ message: 'Email does not exist' })
            }

        } else {
            return res.status(404).send({ message: 'User does not exist' })
        }

    } catch (err) {
        return res.status(404).send({ message: 'User does not exist' })
    }

}

//user profile update
const updateUser = async (req, res) => {
    const email = req.params.email;

    const user = await User.findOne({ email: email });

    const password = user.password;


    const newUser = {
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:password,
        type:req.body.type,
        station:req.body.station,
        vehicleType:req.body.vehicleType,
        vehicleId:req.body.vehicleId
      
    }

    try {
        const response = await User.findOneAndUpdate({ email: email }, newUser);
        if (response) {
            return res.status(200).send({ message: 'Profile Updated' });
        } else {
            return res.status(500).send({ message: 'Internal server error' });
        }

    } catch (err) {
        return res.status(400).send({ message: 'Update Failed' })
    }

}

//user profile delete
const deleteUser = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOneAndDelete({ email: email });
        if (user) {
            return res.status(204).send({ message: 'Profile deleted' });
        } else {
            return res.status(404).send({ message: 'Incorrect Email' });
        }

    } catch (err) {
        return res.status(500).send({ message: 'Internal Server Error' })
    }

}

//view all stations of an owner 
const getOwnerStations = async (req, res) => {

    const email = req.params.email;

    try {
        let user = await User.findOne({email});
        if (user) {
            // return res.json(user.station)
            return res.status(400).send({ data: user.station })
        } else {
            return res.status(404).send({ message: 'No users available' });
        }
    } catch (err) {
        return res.status(500).send({ message: 'Internal server error' })
    }
}



module.exports = {
    register,
    login,
    getAllUsers, 
    updateUserPassword,
    updateUser,
    deleteUser,
    getOwnerStations
};