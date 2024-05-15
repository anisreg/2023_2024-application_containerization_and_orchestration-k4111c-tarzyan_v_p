const mongoose = require("mongoose");
const schemas = require("./schemas");

const mongo = {
    getUser: async function (name) {
        return await schemas.User.findOne({username: name});
    },
    deleteUser: async function (name) {
        return await schemas.User.findOneAndDelete({username: name});
    },
    createUser: async function (name) {
        const id = new mongoose.Types.ObjectId();
        const mvcRole = new schemas.User({
            _id: id,
            username:name,
        });
        return mvcRole.save();
    }
}

module.exports = mongo