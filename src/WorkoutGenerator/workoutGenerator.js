const assignGroup = (group, rows) => rows
    .map(row => ({...row, group}));

const warmupRows = [
    { activity: 'Limber 11' },
    { activity: 'Band pull-aparts', reps: 10, sets: 3 },
    { activity: 'Shoulder dislocations', reps: 10, sets: 1 },
    { activity: '30 second paused bodyweight squat' }
];

const jumpsThrowsRows = [
    { activity: 'Box jumps', reps: 10 },
];

const roundUpToNearest = (num, nearest) => num + nearest - ((num + nearest) % nearest);

const calculateSetWeight = (tm, percOfTm) => roundUpToNearest(tm * percOfTm, 5);

const accessoryRows = [
    { activity: 'Push', reps: '25 - 50' },
    { activity: 'Pull', reps: '25 - 50' },
    { activity: 'Ab/Single Leg', reps: '25 - 50' }
];

const weekConfiguration = {
    1: {
        percentages: [.65, .75, .85],
        reps: [5, 5, 5]
    },
    2: {
        percentages: [.7, .8, .9],
        reps: [3, 3, 3]
    },
    3: {
        percentages: [.75, .85, .95],
        reps: [5, 3, 1]
    }
};

const calculateMainLiftWarmupWeights = tm =>
    [.4, .5, .6].map(percOfTm => calculateSetWeight(tm, percOfTm));

const generateMainLiftWarmupRows = (lift, tm) =>
    calculateMainLiftWarmupWeights(tm)
        .map(weight => ({
            activity: lift,
            weight: weight,
            reps: 5,
            sets: 1
        }));

const calculateMainLiftWorkingSetWeights = (week, tm) => {
    const weekPercentages = weekConfiguration[week].percentages;
    return weekPercentages
        .map(percOfTm => calculateSetWeight(tm, percOfTm));
};

const generateMainLiftWorkingRows = (lift, week, tm) => {
    const weekRepScheme = weekConfiguration[week].reps;
    return calculateMainLiftWorkingSetWeights(week, tm)
        .map((weight, index) => ({
            activity: lift,
            weight: weight,
            reps: weekRepScheme[index],
            sets: 1
        }));
}

const SUPPLEMENTAL_PERCENTAGE = 0.4;
const generateSupplementalRows = (lift, tm) => ([{
    activity: lift,
    weight: calculateSetWeight(tm, SUPPLEMENTAL_PERCENTAGE),
    reps: 10,
    sets: 5
}]);

const foreverBBB = {
    liftOrder: ['Squat', 'Deadlift', 'Bench Press', 'Overhead Press'],
    daysPerWeek: 3
};

const generateForeverBBBWorkout = (week, day, trainingMaxes) => {
    const { daysPerWeek, liftOrder } = foreverBBB;
    const nthDay = ((week - 1) * daysPerWeek) + day;
    const lift = liftOrder[((nthDay - 1) % liftOrder.length)];
    const tm =
        lift === 'Squat'
            ? trainingMaxes.squatTm
            : lift === 'Deadlift'
                ? trainingMaxes.deadliftTm
                : lift === 'Bench Press'
                    ? trainingMaxes.benchPressTm
                    : lift === 'Overhead Press'
                        ? trainingMaxes.overheadPressTm
                        : 0;

    const mainLiftWarmupRows = generateMainLiftWarmupRows(lift, tm);
    const mainLiftWorkingSetRows = generateMainLiftWorkingRows(lift, week, tm);
    const supplementalRows = generateSupplementalRows(lift, tm);

    return [
        ...assignGroup('Warmup/Mobility', warmupRows),
        ...assignGroup('Jumps/Throws', jumpsThrowsRows),
        ...assignGroup(`${lift} Warmup Sets`, mainLiftWarmupRows),
        ...assignGroup(`${lift} Working Sets`, mainLiftWorkingSetRows),
        ...assignGroup(`${lift} Supplemental Sets`, supplementalRows),
        ...assignGroup('Accessories', accessoryRows)
    ].map((row, index) => ({...row, id: index}));
};

export default {
    generateForeverBBBWorkout
};