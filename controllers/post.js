const PostModel = require('../models/Post');
const UserModel = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

exports.readPost = (req,res) => {
   PostModel.find((err, docs) => {
      if (!err) res.send(docs)
      else console.log('Error to get data : ' + err);
   })
}


 // controller pour afficher une sauce 
exports.readOnePost = (req, res, next) => {
    PostModel.findOne({ _id : req.params.id })
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(404).json({ error }));
  };

exports.createPost = async (req,res) => {
    const newPost = new PostModel({
        titre: req.body.titre,
        message: req.body.message
        
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
}

// controller pour modifier une sauce
exports.updatePost = (req,res) => {

    if(req.file){
        PostModel.findOne({_id : req.params.id})
      .then((objet) => {
          // récupération du nom de la photo à supprimer dans la base de données
          const filename = objet.imageUrl.split("/images")[1] ;
          console.log(filename);
          //suppression de l'image dans le dossier images
          fs.unlink(`images/${filename}`, (error) => {
              if(error) throw error;
          })
      })
      .catch(error => res.status(400).json({ error })); 
    }else{
      console.log(false);
    }
    
    // l'objet qui va être mis à jour dans la base de données
    // deux cas possible
    const postObject = req.file ? 
    {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : 
    {
      ...req.body
  
    }
  
    // modifications qui seront envoyé dans la base de données
    PostModel.updateOne({ _id : req.params.id }, {...postObject , _id : req.params.id})
        .then(() => res.status(200).json({ 
          message: "objet modifié"
        
        }))
        .catch(error => res.status(400).json({ error }));
  };


exports.deletePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
      return res.status(400).send('ID unknow :' + req.params.id)

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )

}


// controller pour gérer les likes
exports.likePost = (req, res, next) => {
    // on récupère le like 
    let like = req.body.like;
    // on récupère l'utilisateur qui a liké
    let userId = req.body.userId;
   
    PostModel.findOne({_id : req.params.id})
    .then((post) => {
        switch (like){
          case 1 :
               post.likes++ 
               post.usersLiked.push(userId);
               console.log(post.usersLiked);
               post.save()
               .then(() => res.status(201).json({ message: ' vous avez liker cette sauce !'}))
               .catch(error => res.status(400).json({ error }));
          break

          case 0 :
            // si l'user a liker , on annule le like
            if(post.usersLiked.includes(userId)){
                 let index = post.usersLiked.indexOf(userId)
                 post.usersLiked.splice(index, 1)
                 post.likes-- 
                 post.save()
                .then(() => res.status(201).json({ message: ' vous avez annulé votre like !'}))
                .catch(error => res.status(400).json({ error }));
            // si l'user a disliker , on annule le dislike
            }
   
          default:
           console.log(error);
        }
    })
    .catch((error) => res.status(500).json({error}))
   }
  