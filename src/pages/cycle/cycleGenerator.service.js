function* nextLiftGenerator(liftOrder) {
  let index = 0;
  while (true) {
    yield liftOrder[index++ % liftOrder.length];
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
  const liftGen = nextLiftGenerator(liftOrder);

  return weeklyRepSchemes.map(week => ({
    sessions: [...Array(daysPerWeek)].map(_ => {
      const lift = liftGen.next().value;
      return {
        sets: week.map(day => ({
          lift,
          reps: day.reps,
          sets: day.sets,
          weight: calculateSetWeight(trainingMaxes[lift], day.percentage),
        })),
      };
    }),
  }));
};

const standard531WeeklyRepSchemes = [
  [
    {
      percentage: 0.65,
      reps: 5,
      sets: 1,
    },
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
    },
    {
      percentage: 0.85,
      reps: 5,
      sets: 1,
    },
  ],
  [
    {
      percentage: 0.6,
      reps: 3,
      sets: 1,
    },
    {
      percentage: 0.7,
      reps: 3,
      sets: 1,
    },
    {
      percentage: 0.8,
      reps: 3,
      sets: 1,
    },
  ],
  [
    {
      percentage: 0.75,
      reps: 5,
      sets: 1,
    },
    {
      percentage: 0.85,
      reps: 3,
      sets: 1,
    },
    {
      percentage: 0.95,
      reps: 1,
      sets: 1,
    },
  ],
];

const foreverBBBConfig = options => ({
  liftOrder: options.liftOrder,
  daysPerWeek: options.daysPerWeek,
  jumpsThrows: 10,
  weeklyRepSchemes: standard531WeeklyRepSchemes.map(week => [
    ...week,
    {
      percentage: options.supplementalTmPercentage,
      reps: 10,
      sets: 5,
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
    liftOrder,
    daysPerWeek,
  } = config;

  return {
    jumpsThrows,
    weeklySessions: generateWeeklySessions(
      weeklyRepSchemes,
      liftOrder,
      trainingMaxes,
      daysPerWeek
    ),
    assistance,
  };
};

export default {
  generateCycle,
};
