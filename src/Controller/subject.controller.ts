import { Response, Request } from "express";
import Subject, { Isubject } from '../Model/subject';
import mongoose from 'mongoose';
import { log } from 'console';

export async function addSubject(req: Request, res: Response): Promise<Response> {

  try {
    console.log("Req Body", req.body)

    const subjectName = req.body.subjectName;

    console.log(subjectName)
    const subjectAlreadyExist: Isubject = await Subject.findOne({ subjectName });
    if (subjectAlreadyExist) {
      return res.status(400).json({ Success: true, message: "Subject Already Exist" });
    }

    const subject = new Subject();
    subject.subjectName = subjectName;

    console.log(subject);
    subject.save();
    res.status(201).json({
      Success: true,
      message: " Subject Created", data : subject
    })
  } catch (error) {
    res.status(400).json({ Success: false, message: error.message })
  }
}

export async function getAllSubject(req: Request, res: Response): Promise<Response> {

  // console.log("RequestName " , req.params.subjectName);

  try {
    const allSubject = await Subject.find();
    if (!allSubject) {
      res.status(400).json({ Success: false, message: "No Available Subject" })
    } else {
      console.log(allSubject)
      res.status(200).json({ Success: true, message: "All Subject Displayed" , data : allSubject})
    }
  } catch (error) {
    console.log("Error in catch", error);
    res.status(400).json({ Success: false, message: error.message })

  }
}

// export async function deleteSubject(req: Request, res: Response): Promise<Response> {
//   console.log("request params ", req.params.subjectName);
//   try {
//     const subjectName = req.params.subjectName;
//     const subject = await Subject.deleteOne({subjectName});
//     if (!subject) {
//       res.status(400).json({ Success: false, message: "No Available Subject" })
//     } else {
//       console.log(subject)
//       res.status(200).json({ Success: true, message: "Deleted Subject " , data : subject })
//     }
//   } catch (error) {
//     console.log("Error in catch", error);
//     res.status(400).json({ Success: false, message: error.message })
//   }
// }
export async function deleteSubject(req: Request, res: Response): Promise<Response> {
  const subjectId = req.params._id; // Access the parameter correctly
  console.log("Request parameters: ", subjectId);

  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(subjectId)) {
      return res.status(400).json({ Success: false, message: "Invalid ID format" });
  }

  try {
      // Check if the subject exists
      const finded_id: Isubject = await Subject.findOne({ _id: subjectId.trim() }); // Ensure we're querying with the right ID
      console.log("Subject found: ", finded_id);

      if (!finded_id) {
          return res.status(404).json({ Success: false, message: "Subject not found" });
      }

      // Attempt to delete the subject by ID
      const result = await Subject.deleteOne({ _id: subjectId });

      // Check if the subject was found and deleted
      if (result.deletedCount === 0) {
          return res.status(400).json({ Success: false, message: "No Available Subject" });
      }

      // If deletion was successful
      console.log("Delete result: ", result); // Log the result for debugging
      return res.status(200).json({ Success: true, message: "Deleted Subject", data: result });
  } catch (error) {
      console.log("Error in delete operation: ", error); // Log any errors
      return res.status(500).json({ Success: false, message: error.message });
  }
}
