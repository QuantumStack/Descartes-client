import { getTrueScore } from '../util/grades';

const filterAssignsByScore = (assigns) => {
  let hasFake = false;
  const filtered = [];
  const remainder = [];
  assigns.forEach((assign) => {
    const { fakeScore, score } = assign;
    let hasScore = false;
    if (fakeScore != null) {
      hasFake = true;
      hasScore = true;
    } else if (score != null) hasScore = true;
    (hasScore ? filtered : remainder).push(assign);
  });
  return [filtered, remainder, hasFake];
};

const filterAssignsByCat = (assigns, id) => assigns.filter(({ category }) => category === id);

export default (assigns, cats) => {
  const [scoredAssigns, unscoredAssigns, hasFake] = filterAssignsByScore(assigns);
  const computedCats = cats.reduce((obj, cat) => {
    const { id } = cat;
    const catAssigns = filterAssignsByCat(scoredAssigns, id);
    const score = catAssigns.reduce((total, assign) => total + getTrueScore(assign));
    const outOf = catAssigns.reduce((total, assign) => total + assign.outOf, 0);
    return {
      ...obj,
      [cat.id]: {
        ...cat,
        score,
        outOf,
      },
    };
  }, {});
  const computedScoredAssigns = scoredAssigns.map((assign) => {
    const { outOf, category: catId } = assign;
    const score = getTrueScore(assign);
    const percent = score / outOf * 100;
    const { weight: catWeight, outOf: catTotal } = computedCats[catId];
    const points = percent / 100 * (outOf / catTotal) * catWeight;
    return {
      ...assign,
      percent,
      points,
    };
  });
  const overallGrade = computedScoredAssigns.reduce((total, assign) => total + assign.points, 0);
  return {
    assignments: computedScoredAssigns.concat(unscoredAssigns),
    scoredAssignments: computedScoredAssigns,
    categories: computedCats,
    grade: overallGrade,
    hasFake,
  };
};
