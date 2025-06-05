const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({});

export const report = mongoose.Model("Report", reportSchema);

