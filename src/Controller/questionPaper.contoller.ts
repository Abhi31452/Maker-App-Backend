import { Response, Request } from "express";
import QuestionPaper from '../Model/questionPaper';
import { deleteAllQuestions } from './questions.controller';
import Question from '../Model/questions';

export async function getAllQuestionPaper(req : Request , res : Response ) :Promise<Response>{

  try {
    const allqeustionPaper = await QuestionPaper.find();
    if(!allqeustionPaper){
      return res.status(400).json({Success : false , message : "No Available Subject"})
    }else{
      return res.status(200).json({Success : true , message : "All QuestionPaper Displayed", data: allqeustionPaper})
    }
    }catch(error){
      console.log("Error in catch" ,error);
      return res.status(400).json({Success : false  , message : error.message} )

    }
}

export async function addQuestionPaper(req:Request , res: Response)  : Promise<Response>{
  console.log(req.body);
  const { title , subjectId} =req.body
  try{
  let questionPaper = new QuestionPaper({
      title ,
      subjectId
  });
  
  await questionPaper.save();
 return res.status(201).json({Success : true , message : " Question Paper Created" ,data : questionPaper})

}catch(error){
  return res.status(400).json({Success : true , message : error.message});
  }
}

export async function deleteQuestionPaper (req :Request , res : Response ): Promise<Response>{
  const questionPaper_id= req.params._id;
try{
  const ifQP_Exist= await QuestionPaper.findOne(questionPaper_id);
  if(!ifQP_Exist){
   return  res.status(400).json({Success : false , message : " No Such Qeustion Paper"})
  }else{
   const allQuestion = await Question.deleteMany(questionPaper_id);
   console.log(allQuestion)
   return res.status(200).json({Success : true , mesaage : "QuestionPaper Deleted " ,data : allQuestion})
  }
}catch(err){
 return  res.status(400).json({
    Success : false , message : err.mesaage
  })
}
}

export async function updateQuestionPaper(req : Request , res : Response ): Promise<Response>{
  const { title , questionsId , subjectId } = req.body;
  const questionPaper_id = req.params._id;

  try {
     const questionPaper = await QuestionPaper.findOne(questionPaper_id);
    if(!questionPaper){
      return res.status(400).json({ Success: false ,message : "Question Paper Not Present " })
    }else{
      questionPaper.title = title
      questionPaper.questionsId =questionsId
      questionPaper.subjectId = subjectId

      questionPaper.save();
      return res.status(200).json({
        Success : true , message : "Updated Successfully" ,
        data : questionPaper
      })
    }

  } catch (error) {
    res.statues(400).json({Succes : false , message : error.message })
  }

}