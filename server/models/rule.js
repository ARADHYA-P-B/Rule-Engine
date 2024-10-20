import mongoose from "mongoose";

const conditionSchema = new mongoose.Schema({
  field: { type: String, required: true },
  operator: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
});

const ruleSchema = new mongoose.Schema({
  conditions: [conditionSchema],
  logic: { type: String, enum: ['AND', 'OR'], required: true },
});

const Rule = mongoose.model('Rule', ruleSchema);

export default Rule;