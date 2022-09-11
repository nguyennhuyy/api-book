const bookController = require('../controllers/bookController');

const router = require('express').Router();

// ADD BOOK
router.post('/', bookController.addABook);

//GET BOOK
router.get('/', bookController.getAllBook);

//GET A BOOK
router.get('/:id', bookController.getAnBook);

//PAGINATION BOOK

//UPDATE A BOOK
router.put('/:id', bookController.updateBook);

//DELETE A BOOK
router.delete('/:id', bookController.deleteBook);
module.exports = router;
