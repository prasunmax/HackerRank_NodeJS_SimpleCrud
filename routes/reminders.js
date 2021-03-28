const router = require('express').Router();
const controller = require('../controllers/reminders');

router.get('/', controller.get_api);
router.get('/:id', controller.get_api);
router.post('/', controller.post_api);
router.patch('/:id', function (req, res, next) {
    res.status(405).send('<p>API does not allow deleting or modifying reminders for any id value</p>');
});
router.put('/:id', function (req, res, next) {
    res.status(405).send('<p>API does not allow deleting or modifying reminders for any id value</p>');
});
router.delete('/:id', function (req, res, next) {
    res.status(405).send('<p>API does not allow deleting or modifying reminders for any id value</p>');
});
module.exports = router;
