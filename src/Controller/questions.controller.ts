import { Response, Request } from "express";
import Question from '../Model/questions';

export async function getAllQuestions(req : Request  , res :Response ) : Promise<Response>{
  try {
    const allquestion = await Question.find();
    if(!allquestion){
      return res.status(400).json({Success : false , message : "No Available Question"})
    }else{
      console.log(allquestion)
      return res.status(200).json({Success : true , message : "All Question Displayed" , data : allquestion})
    }
    }catch(error){
      console.log("Error in catch" ,error);
      return res.status(400).json({Success : false  , message : error.message} )

    }


}
export async function addQuestion(req : Request  , res :Response ): Promise<Response>{

  const {questionText, questionType , option ,correctAnswer , marks , questionPaperId} = req.body;
try{
  
   const newQuestion = new Question({
    questionText,
    questionType,
    option,
    correctAnswer,
    marks,
    questionPaperId
   }); 
 
    await newQuestion.save();
    console.log(newQuestion);
    return res.status(200).json({Success : true , message : "Question Added" ,data : newQuestion})
  
}
catch(error) {
  console.log("Error while adding question:", error);
  return res.status(400).json({ Success: false, message: error.message });
}



}
export async function deleteQuestion(req : Request  , res :Response ) : Promise<Response>{

  const questionpaperId = req.params._id;
  const ifQuestionExist = await Question.findOne(questionpaperId);
  try{
  if(!ifQuestionExist){
    
    return res.status(400).json({Success : false , message : "No Available Question"})
  }else{
        console.log(ifQuestionExist);
    return res.status(200).json({Success : true , message : "Question Deleted" ,data : ifQuestionExist })
  }
}catch(error){
  return res.status(400).json({Success : false , message : error.message})
}
}
export async function updateQuestion(req : Request  , res :Response ) : Promise<Response>{

  const questionPaperId = req.params._id;
  const {questionText, questionType , option ,correctAnswer , marks } = req.body;
try{
  let 
   questionExist = await Question.findOne(questionPaperId);
   if(!questionExist){
  return res.status(400).json({Success : false , message : "Question not Exist"})
   }else{
    questionExist = new Question({
      questionText,
      questionType,
      option,
      correctAnswer,
      marks,
      questionPaperId
    });
   await questionExist.save();
  return res.status(201).json({Success : true , message : "Question Added " ,data : questionExist})

   } 
}catch(err){
  return res.status(400).json({Success : false , message : err.message})
}

}



export async function deleteAllQuestions(req : Request  , res :Response ) : Promise<Response>{

  const ifQuestionExist = await Question.find();
  try{
         console.log(ifQuestionExist);
    return res.status(200).json({Success : true , message : "Question Deleted"})
}catch(error){
  return res.status(400).json({Success : false , message : error.message})
}
}