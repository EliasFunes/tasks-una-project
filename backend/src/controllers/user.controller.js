const UserModel = require('../models/User');
const TaskModel = require('../models/Task');

module.exports = {

    async getUsers(req, res){
        try {
            const users = await UserModel.find();
            res.json(users);
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error finding users error:${e}`
            });
        }
    },

    async getUser(req, res){
        try {
          const user = await UserModel.findOne({_id: req.params.id});
          const tasks = await TaskModel.find({userId:req.params.id});


          res.json({_id:user._id, username:user.username, email:user.email, estado:user.estado, tareas:tasks});
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error finding user error:${e}`
            });
        }
    },

    async createUser(req, res){
        try {
            const {username, email} = req.body;

            if(!username){
                return res.json({
                    status: 500,
                    success: false,
                    message: "Username cannot be empty"
                });
            }

            if(!email){
                return res.json({
                    status: 500,
                    success: false,
                    message: "Email cannot be empty"
                });
            }

            const newUser = new UserModel({
                username,
                email
            });

            await newUser.save();

            res.json({
                status:200,
                success:true,
                message:"User created"
            });

        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to save user, error:${e}`
            });
        }
    },

    async updateUser(req, res){
        try {
            await UserModel.findByIdAndUpdate(req.params.id, req.body);
            res.json({
                status: 200,
                success: true,
                message: `User updated`
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to update user, error:${e}`
            });
        }
    },

    async deleteUser(req, res){
        try {

            const tasks = await TaskModel.find({userId:req.params.id, completed:false});
            if(tasks.length > 0){
                return res.json({
                    status: 500,
                    success: false,
                    message: `Cannot delete the user because he has a pendind task`
                });
            }

            await UserModel.findByIdAndDelete(req.params.id);
            await TaskModel.deleteMany({userId:req.params.id, completed:false});
            res.json({
                status: 200,
                success: true,
                message: `User deleted`
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to update dele, error:${e}`
            });
        }
    },

    async bajaUser(req, res){
        try {

            const pendingTask = await TaskModel.find({userId: req.params.id, completed: false});
            if(pendingTask.length > 0){
                res.json({
                    status: 500,
                    success: false,
                    message: `Cannot update state of user because has a pending task`
                });
            }

            await UserModel.findByIdAndUpdate(req.params.id, {estado:'inactivo'});
            res.json({
                status: 200,
                success: true,
                message: `User inactive`
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to update user, error:${e}`
            });
        }
    },

    async altaUser(req, res){
        try {
            await UserModel.findByIdAndUpdate(req.params.id, {estado:'activo'});
            res.json({
                status: 200,
                success: true,
                message: `User activated`
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to update user, error:${e}`
            });
        }
    }

}