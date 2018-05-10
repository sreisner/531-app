function* dailyLiftsGenerator(dailyLifts) {
  let index = 0;
  while (true) {
    yield dailyLifts[index++ % dailyLifts.length];
  }
}

const roundUpToNearest = (num, nearest) =>
  num + nearest - (num + nearest) % nearest;
const calculateSetWeight = (tm, percOfTm) => roundUpToNearest(tm * percOfTm, 5);

const generateWeeklySessions = (
  weeklyRepSchemes,
  liftOrder,
  trainingMaxes,
  daysPerWeek
) => {
  const liftGen = dailyLiftsGenerator(liftOrder);

  return weeklyRepSchemes.map(week => ({
    sessions: [...Array(daysPerWeek)].map(_ => {
      const dailyLifts = liftGen.next().value;

      return {
        sets: week.map(day => {
          const lift = dailyLifts[day.liftIndex];

          return {
            lift,
            reps: day.reps,
            sets: day.sets,
            weight: calculateSetWeight(trainingMaxes[lift], day.percentage),
          };
        }),
      };
    }),
  }));
};

/*
The liftIndex is used for days programmed with different lifts.
For example in Forever BBB, users have the option to do squats
for the 5/3/1 sets (so that will end up being liftIndex 0) and
deadlifts for the 5x10 sets (which will end up being liftIndex 1)
*/
const standard531WeeklyRepSchemes = [
  [
    {
      percentage: 0.65,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.85,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
  ],
  [
    {
      percentage: 0.7,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.8,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.9,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
  ],
  [
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.85,
      reps: 3,
      sets: 1,
      liftIndex: 0,
    },
    {
      percentage: 0.95,
      reps: 1,
      sets: 1,
      liftIndex: 0,
    },
  ],
];

const foreverBBBConfig = options => ({
  dailyLifts: options.dailyLifts,
  daysPerWeek: options.daysPerWeek,
  jumpsThrows: 10,
  weeklyRepSchemes: standard531WeeklyRepSchemes.map(week => [
    ...week,
    {
      percentage: options.supplementalTmPercentage,
      reps: 10,
      sets: 5,
      liftIndex: options.slightlyLessBoring ? 1 : 0,
    },
  ]),
  assistance: {
    push: {
      minReps: 25,
      maxReps: 50,
    },
    pull: {
      minReps: 25,
      maxReps: 50,
    },
    abs: {
      minReps: 0,
      maxReps: 50,
    },
  },
});

const templateConfigMap = {
  1: foreverBBBConfig,
};

const generateCycle = (templateId, trainingMaxes, options) => {
  const config = templateConfigMap[templateId](options);
  const {
    jumpsThrows,
    weeklyRepSchemes,
    assistance,
    dailyLifts,
    daysPerWeek,
  } = config;

  return {
    jumpsThrows,
    weeklySessions: generateWeeklySessions(
      weeklyRepSchemes,
      dailyLifts,
      trainingMaxes,
      daysPerWeek
    ),
    assistance,
  };
};

export default {
  generateCycle,
};

// http://localhost:3000/cycle?squat=315&deadlift=405&bench=225&press=135&templateId=1&options={"daysPerWeek":3,"supplementalTmPercentage":0.4,"dailyLifts":[["squat","deadlift"],["bench","press"],["deadlift","squat"],["press","bench"]],"slightlyLessBoring":true}
