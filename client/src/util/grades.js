export const getTrueScore = ({
  fakeScore, score, override, outOf,
}) => {
  let master = fakeScore || score;
  if (override) master = override * outOf / 100;
  return master;
};

export const gradeRound = n => Math.round(n * 100) / 100;
