import {
  getInformation,
  addInformation,
  addLanguage,
  getRanking,
  postUserAvatar,
  getGeneralInformation,
} from "../controllers/user.js";
import multer from "multer";

const storage = multer.memoryStorage();

// img filter
const isImage = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(file.originalname.toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fields: 5,
    fieldNameSize: 50, // TODO: Check if this size is enough
    fieldSize: 20000, //TODO: Check if this size is enough
    // TODO: Change this line after compression
    fileSize: 25000000, // 25 MB for a 1080x1080 JPG 90
  },
  fileFilter: isImage,
});

import express from "express";

const router = express.Router();

router.get("/general", getGeneralInformation);

router.get("/getRanking", getRanking);

router.get("/getInformation", getInformation);
router.post("/addInformation", addInformation);

router.post("/addLanguage", addLanguage);

router.post("/avatar", upload.single("file"), postUserAvatar);

export default router;
