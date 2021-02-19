const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const { ifError } = require("assert");

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCS_CLIEN_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY
  }
});

const bucket = storage.bucket(process.env.GCS_BUCKET);

let uploadHandler = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileZise: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb('Only .png, .jpg and .jpeg format allowed!');
    }
  }
});

exports.postImg =uploadHandler.single('file');

exports.gcpUpdate = (req, res) => {
  const newFileName = uuidv4() + path.extname(req.file.originalname);
  const blob = bucket.file(newFileName);
  const blobStream = blob.createWriteStream({
    resumable: false,
    gzip: true
  }).on('finish', () => {
    const publicURL = `https://storage.googleapis.com/${process.env.GCS_BUCKET}/${blob.name}`
    res.json(publicURL);
  });
  blobStream.end(req.file.buffer);
}