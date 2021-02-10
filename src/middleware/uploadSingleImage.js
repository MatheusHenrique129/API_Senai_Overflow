const Multer = require("multer");

const uploadSingleImage = Multer({
  storage: Multer.memoryStorage(),
  /*
        {
        destination: "uploads/",
        filename: (req, file, calback) => {
            //pop pega sempre a ultima estima de um vetor
            const filename = Date.now() + "." + file.originalname.split(".").pop();

            return calback(null, filename);
        }
    }*/

  fileFilter: (req, file, calback) => {
    let allowedType = ["image/png", "image/jpeg", "image/gif"];

    if (allowedType.includes(file.mimetype)) {
      calback(null, true);
    } else {
      calback(new Error("Tipo do arquivo inválido!"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, //Máximo de 2Mb
  },
});

module.exports = uploadSingleImage.single("image");