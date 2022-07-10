const router = require('express').Router();
const postController = require('../controllers/post');
const auth = require ('../middleware/auth');
const multer = require ('../middleware/multer-config');

router.get('/',postController.readPost);
router.get('/:id',postController.readOnePost);
router.post('/create',auth,multer.single("post_image"),postController.createPost);
router.put('/update/:id',auth,multer.single("post_image"),postController.updatePost);
router.delete('/delete/:id',auth,multer.single("post_image"),postController.deletePost);
router.post('/like/:id',auth,postController.likePost);
module.exports = router;