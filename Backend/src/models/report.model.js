const mongoose = require('mongoose');

/**
 * Report Schema
 * job description :String
 * self description: String
 * resume text: String
 * 
 * AI=>
 * score: Number
 * technical questions :[{ question: '', answer: '',intention: '' }]
 * behavioral questions: [{ question: '', answer: '',intention: '' }]
 * skill gaps; [{skill: '', severity: {low, medium, high} }]
 * roadmap; [{day: '', topic: '', resources: '',tasks: ''}]
 * 
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    intention: { type: String, required: true }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    intention: { type: String, required: true }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high'], required: true }
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    resources: { type: [String], required: true },
    tasks: { type: [String], required: true }
}, { _id: false });


const reportSchema = new mongoose.Schema({
    jobDescription: { type: String, required: true },
    selfDescription: { type: String, required: true },
    resume: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },    

    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    roadmap: [roadmapSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required :true
    }
}, { timestamps: true });


const reportModel = mongoose.model('Report', reportSchema);

module.exports = reportModel;