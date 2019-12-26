const TaskSchema = require('../models/Task');
const UserSchema = require('../models/User');

module.exports = {

    async getTask(req, res){
        try {
           const task = await TaskSchema.findById(req.params.id);
           res.json(task);
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error getting task, error:${e}`
            })
        }
    },

    async getTasks(req, res){
        try {
            const tasks = await TaskSchema.find();
            res.json(tasks);
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error getting tasks, error:${e}`
            })
        }
    },

    async createTask(req, res){
        try {
            const {title, description, userId} = req.body;

            const users = await UserSchema.find({_id:userId, estado:'activo'});

            if(users.length <= 0){
               return res.json({
                   status: 500,
                   success: false,
                   message: "Task cannot by created because active user with provided ID doesn't exists"
               });
            }

            const newTask = new TaskSchema({
                title,
                description,
                userId
            })
            await newTask.save();
            res.json({
                status: 200,
                success: true,
                message: "Task created"
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to create task, error:${e}`
            });
        }

    },

    async updateTask(req, res){
        try {
            await TaskSchema.findByIdAndUpdate(req.params.id, req.body);
            res.json({
                status: 200,
                success: true,
                message: "Task updated"
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to update task, error:${e}`
            });
        }
    },

    async deleteTask(req, res){
        try {
            await TaskSchema.findByIdAndDelete(req.params.id);
            res.json({
                status: 200,
                success: true,
                message: "Task deleted"
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to delete task, error:${e}`
            });
        }
    },

    async taskCompleted(req, res){
        try {
            await TaskSchema.findByIdAndUpdate(req.params.id, {completed:true});
            res.json({
                status: 200,
                success: true,
                message: "Task completed"
            });
        } catch (e) {
            res.json({
                status: 500,
                success: false,
                message: `Error to complete task, error:${e}`
            });
        }
    }

}