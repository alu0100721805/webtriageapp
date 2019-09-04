var mongoose = require('mongoose');

var TriageSchema = mongoose.Schema({
  triageId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true
  },
  tags: [ {
    type: String,
    ref: 'Tag'
  }],
  users: [ {
    type: String,
    ref: 'User'
  }],
  creationDate: {
    type: Date,
    expires: 86400,
    default: Date.now
  }
});

var Triage = mongoose.model('Triage', TriageSchema);
module.exports = Triage;



