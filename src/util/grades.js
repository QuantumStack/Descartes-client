export const getTrueScore = ({
  fakeScore, score, override, outOf,
}) => {
  let master = score;
  if (override != null) master = override * outOf / 100;
  if (fakeScore != null) master = fakeScore;
  return master;
};

export const gradeRound = n => Math.round(n * 100) / 100;
