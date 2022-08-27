const router = require("express").Router();
const student = require('../controller/student')
const { isAuthenticated } = require('../middleware/auth')
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "public/images"); },
filename: function (req, file, cb) {
cb(null, Date.now ( ) + file.originalname);},});

var upload = multer({ storage: storage });

// post book
router.post('/create/student/details',  isAuthenticated,upload.single("myField"),student.postStudentDetails)

//get book
router.get("/get/studentdetails",isAuthenticated,student.getStudent)

//patch api for book
router.patch("/update/student/:id", isAuthenticated,upload.single("myField"), student.UpdateStudentDetails )

//Delete api --
router.delete("/delete/student/:id",isAuthenticated,student.deletetudentDetails)


module.exports= router