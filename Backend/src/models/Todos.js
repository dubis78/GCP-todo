const { Schema, model } = require('mongoose');

const todosSchema = new Schema({
  userId: Schema.ObjectId,
  todos:[{
    text:{type: String, required:true},
    urlImg:{type: String},
    timer:{type: Date},
    urgent:{type: Boolean, default: false},
    priority:{type: Boolean, default: false},
    completed:{type: Boolean, default: false}
  }]
});
module.exports = model('Todos',todosSchema);