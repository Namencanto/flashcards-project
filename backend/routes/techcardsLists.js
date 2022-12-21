import {
  getTechcardList,
  uploadImage,
  uploadListImage,
} from "../controllers/techcardList.js";
import multer from "multer";

import express from "express";

const router = express.Router();
("../../../");
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

router.get("/get", getTechcardList);

router.post("/upload", upload.single("file"), uploadImage);
router.post("/upload/save-in-user", uploadImage);

router.post("/upload/to-list", upload.single("file"), uploadListImage);
router.post("/upload/to-list/save-in-user", uploadListImage);

export default router;
