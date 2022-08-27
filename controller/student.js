// const book = require("../modles/book");
const Student = require("../models/student");

//post API for book
const postStudentDetails = async (req, res) => {
  console.log("enter")
  let photo = req.body
  let { StudentName, StudentClass,StudentAddress } = photo;
  console.log(req.file)
  const path = req.file.destination + "/" + req.file.originalname
  if(!path) throw new Error('no  images file')
  console.log(path)

  // return

  try {
    if (!(StudentName && StudentClass &&  StudentAddress)) {
      res.status(400).json({ message: "All fields are required", status: false });
    } else {
      const getResponce = await  Student .create({
        StudentClass,
        StudentAddress,
        StudentName,
        StudentImage:path
      });

      if (!getResponce) {
        res.status(400).json({ message: "Student Details is not created", status: false });
      } else {
        res.status(200).json({
          message: "Student Details is created successfully",
          data: getResponce,
          status: true,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: false });
  }
};


//getAll books

const getStudent = async (req, res) => {
    try {
      const getStudentDetails = await  Student .find();
      if (!getStudentDetails) {
        res.json({ message: "there is no book", status: false });
      }
      res.json({
        message: "Found the Student details ",
        data: getStudentDetails,
        status: true,
      });
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };
  

//patch api  for book

const UpdateStudentDetails = async (req, res) => {
  let photo = req.body
  
    let { StudentName, StudentClass,StudentAddress} = photo;
    console.log(req.file)
    const path = req.file.destination + "/" + req.file.originalname
    if(!path) throw new Error('no  images file')
    console.log(path)
    try {
      const updateStudentDetails = await  Student .findOneAndUpdate({ id: req.params.id }
        , {StudentName, StudentClass,StudentAddress,StudentImage:path});
      if (!updateStudentDetails ) {
        res.json({ message: "Enter the correct id", status: false });
      } else {
        res.json({
          message: "Student Details  has updated successsfully",
          data: updateStudentDetails ,
          status: true,
        });
      }
    } catch (error) {
      res.json({ message: error.message, status: false });
    }
  };
  

//Delete api 

const deletetudentDetails = async (req, res) => {
    try {
      const deteleStudentDetails = await  Student .findOneAndDelete({ id: req.params.id });
      if (!deteleStudentDetails) {
        res.json({ message: "Enter the correct id", status: false });
      } else {
        res.send({ message: "Student Details  has deleted successfully", status: true });
      }
    } catch (error) {
      res.send({ message: error.message, status: false });
    }
  };
  


  module.exports = {
    postStudentDetails,
    getStudent,
    UpdateStudentDetails ,
    deletetudentDetails

  }