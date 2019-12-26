const {Router} = require('express');
const router = Router();

const {getTasks, getTask, createTask, updateTask, deleteTask, taskCompleted} = require('../controllers/task.controller');

router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/task-completed/:id', taskCompleted);

module.exports = router;