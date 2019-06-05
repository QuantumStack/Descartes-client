const filterAssignsByScore = (assigns) => {
  let hasFake = false;
  const filtered = assigns.filter(({ fakeScore, score }) => {
    if (fakeScore != null) {
      hasFake = true;
      return true;
    }
    return score != null;
  });
  return [filtered, hasFake];
};

const filterAssignsByCat = (assigns, id) => assigns.filter(({ category }) => category === id);

const getTrueScore = ({
  fakeScore, score, override, outOf,
}) => {
  let master = fakeScore || score;
  if (override) master = override * outOf / 100;
  return master;
};

export default (assigns, cats) => {
  const [scoredAssigns, hasFake] = filterAssignsByScore(assigns);
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
    assignments: assigns,
    scoredAssignments: computedScoredAssigns,
    categories: computedCats,
    grade: overallGrade,
    hasFake,
  };
};
