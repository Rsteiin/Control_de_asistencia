const multer  = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname)
  }
});

const config = multer({ 
  storage: storage, 
  limits:{
    files:1
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/json") {
      cb(null, true);
    } else {
      cb(new Error('Invalid mime type'));
    }
}
});

const upload = config.any();

const checkUpload = (req,res,next) => {
  upload(req, res, function(err){
    if(err){
      return res.status(400).send({ message: err.message })
    }else{
      return next()
    }
  })
}

module.exports = checkUpload