import { TemplatesService } from '../../services/api/templates/templates.service';

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
  trainingMaxes,
  weeklyRepSchemes,
  liftOrder,
  daysPerWeek
) => {
  const liftGen = dailyLiftsGenerator(liftOrder);

  return weeklyRepSchemes.map(week => ({
    sessions: [...Array(daysPerWeek)].map(_ => {
      const dailyLifts = liftGen.next().value;

      return {
        sets: week.map(day => {
          // TODO:  Turn the liftOrder argument to this function
          // into an array of arrays.  Each element in the array
          // of arrays represents the lift options for a single
          // day and the liftIndex corresponds to one of those
          // lifts.  The challenge right now is moving the chosen
          // array of arrays to this page via query params.
          // const lift = dailyLifts[day.liftIndex];
          const lift = dailyLifts;

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

const generateCycle = (templateId, trainingMaxes, options) =>
  TemplatesService.getTemplateConfig(templateId, options).then(config => ({
    jumpsThrows: config.jumpsThrows,
    weeklySessions: generateWeeklySessions(
      trainingMaxes,
      config.weeklyRepSchemes,
      config.dailyLifts,
      config.daysPerWeek
    ),
    assistance: config.assistance,
  }));

export default {
  generateCycle,
};
