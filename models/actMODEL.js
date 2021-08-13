const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true,
                lowercase: true,
                required: [true, 'String is required']
            },
            name: {
                type: String,
                trim: true,
                required: [true, 'String is required']
            },
            duration: {
                type: Number,
                required: [true, 'Number value is required']
            },
            weight: {
                type: Number,
                required: [true, 'Number value is required']
            },
            reps: {
                type: Number,
                required: [true, 'Number value is required']
            },
            sets: {
                type: Number,
                required: [true, 'Number value is required']
            }
        }
    ],
});

actSchema.methods.nameCapCase = function () {
    this.exercises[1] = this.exercises[1].replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    return this.exercises[1]
}

const Workout = mongoose.model('Workout', actSchema);

module.exports = Workout;
