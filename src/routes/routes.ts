const express = require("express");
import { verify } from "crypto";
import { login } from "../Controller/login.controller";
import { signup } from "../Controller/signup.controller";
import { verifyEmail } from "../Controller/verifyEmail.contoller";
import { addSubject, deleteSubject, getAllSubject } from '../Controller/subject.controller';
import { addQuestionPaper, deleteQuestionPaper, getAllQuestionPaper, updateQuestionPaper } from '../Controller/questionPaper.contoller';
import { addQuestion, deleteQuestion, getAllQuestions, updateQuestion } from '../Controller/questions.controller';


export const route = express.Router();

route.post("/signup", signup);
route.post("/login" ,login);
route.post("/logout" ,async (req, res)=>{
req.clearCookie("token");
res.status(200).json({"Logout Successfully ":String});
})
route.post("/verify-email" , verifyEmail)


route.get("/getAllSubject" ,getAllSubject);
route.post("/addSubject" , addSubject);
route.delete("/deleteSubject/:_id" , deleteSubject);


route.get("/getAllQuestionPaper" ,getAllQuestionPaper)
route.post("/addQuestionPaper" ,addQuestionPaper)
route.put("/updatequestionPaper/:_id" ,updateQuestionPaper)
route.delete("/deleteQuestionPaper/:_id", deleteQuestionPaper)

route.get("/getAllQuestion" ,getAllQuestions)
route.post("/addQuestion" ,addQuestion)
route.put("/updatequestion/:_id" ,updateQuestion)
route.delete("/deleteQuestion/:_id", deleteQuestion)