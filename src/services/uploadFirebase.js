const { errors } = require("celebrate");
const admin = require("firebase-admin");

const serviceAccount = require("../config/firebase-key.json");

//alterar para o seu bucket
const BUCKET = "senai-overflow-2021-01.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadFirebase = (req, res, next) => {
  if (!req.file) return next();

  const image = req.file;

  const fileName = Date.now() + "." + image.originalname.split(".").pop();

  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image.mimeType,
    },
  });

  stream.on("error", (error) => {
    console.error(error);

    res.status(500).send({ error: "Erro ao subir para o Firebase" });
  });

  stream.on("finish", () => {
    file.makePublic();

    req.file.fileName = fileName;

    req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${fileName}`;

    next();
  });

  stream.end(image.buffer);
};

module.exports = uploadFirebase;
