const mongoose = require('mongoose');
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  position: { type: String, required: true },
  battingStyle: { type: String  },
  bowlingStyle: { type: String  },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);
 