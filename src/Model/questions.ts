
import mongoose, { mongo, Mongoose } from 'mongoose';

export interface IQuestion{

  questionText : String,
  questionType : 'MCQ' | 'True/False' | 'Descriptive',
  option? : String[],
  correctAnswer : String ,
  marks : Number,
  questionPaperId : mongoose.Schema.Types.ObjectId
}

const QeustionSchema = new mongoose.Schema({

  questionText : {
    type : String,
    required : true
  },
  questionType :{
    type : String,
    enum:['MCQ' , 'True/False' , 'Descriptive'],
    required : true 
  },
  option : {
    type : Array<String>
  },
  correctAnswer : {
    type : String,
    required : true  
  },
  marks : {
    type : Number,
    required : true
  },
  questionPaperId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionPaper',
    required : true
  }

})


const Question =mongoose.model("question" , QeustionSchema);
export default Question;



