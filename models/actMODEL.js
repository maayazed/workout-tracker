const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const actSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
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
        type: { num: String },
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
});

actSchema.methods.nameCapCase = function () {
    this.name = this.name.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
    return this.name;
};

actSchema.methods.timeDesc = function () {
    this.duration = `${this.duration} minutes`;
    return this.duration;
}

const Workout = mongoose.model('Workout', actSchema);

module.exports = Workout;

// const workout = new Workout({
//     type: 'cardio',
//     name: 'high jumps',
//     duration: '20',
//     reps: 5,
//     sets: 5
// })

// workout.nameCapCase();

// workout.timeDesc();

// console.log(workout);