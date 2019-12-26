const {Router} = require('express');
const router = Router();
const {getUser, getUsers, createUser, updateUser, deleteUser, altaUser, bajaUser} = require('../controllers/user.controller');


router.get('/:id', getUser);
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.put('/alta-user/:id', altaUser);
router.put('/baja-user/:id', bajaUser);


module.exports = router;

