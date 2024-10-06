
import mongoose from 'mongoose';
import { title } from 'process';

export interface IQuestionPaper{
  title : String ,
  questionsId : Array<String>,
  subjectId : mongoose.Schema.Types.ObjectId

}

const QuestionPaperSchema = new mongoose.Schema({
  title : {
      type : String,
      required : true
  },
  questionsId : {                                                      //Problem in id of QuestionPaper 
    type : Array<String>,
    required : true
  },
  subjectId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required : true
  }
})

const QuestionPaper = mongoose.model("QuestionPaper", QuestionPaperSchema);
export default QuestionPaper;