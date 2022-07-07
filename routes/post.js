const router = require('express').Router();
const postController = require('../controllers/post');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');

router.get('/',postController.readPost);
router.get('/:id',postController.readOnePost);
router.post('/',auth,multer,postController.createPost);
router.put('/:id',auth,multer,postController.updatePost);
router.delete('/:id',auth,multer,postController.deletePost);
router.post('/:id/like',auth,postController.likePost);
module.exports = router;