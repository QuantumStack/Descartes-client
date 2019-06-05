export default class {
  constructor(assigns, cats) {
    this.assigns = assigns;
    // this.sort();
    this.cats = cats;
    this.grade = this.overall();
    this.hasFake = false;
  }

  // assignments that have non-null score
  get scored() {
    return this.assigns.filter(({ fakeScore, score }) => {
      if (fakeScore != null) {
        this.hasFake = true;
        return true;
      }
      return score != null;
    });
  }

  // sort assignments by some parameter
  sort(param = 'date', order = 1) {
    this.assigns = this.assigns.sort(({ [param]: a }, { [param]: b }) => {
      let val = 0;
      if (a < b) val = -1;
      if (a > b) val = 1;
      return val * order;
    });
  }

  // sum of assignment scores in a category
  catScore(id) {
    const cat = this.cats[id];
    if (cat.score == null) {
      cat.score = this.scored
        .filter(a => a.category === id)
        .reduce((total, {
          fakeScore, score, override, outOf,
        }) => {
          let added = fakeScore || score;
          if (override) added = override * outOf / 100;
          return total + added;
        }, 0);
    }
    return cat.score;
  }

  // sum of assignment outOf points in a category
  catTotal(id) {
    const cat = this.cats[id];
    if (cat.outOf == null) {
      cat.outOf = this.scored
        .filter(a => a.category === id)
        .reduce((total, { outOf }) => total + outOf, 0);
    }
    return cat.outOf;
  }

  // score out of 100 for assignment
  getPercent(index, type = 'assigns') {
    const single = this[type][index];
    if (single.percent == null) {
      console.log(single);
      single.percent = single.override || ((single.fakeScore || single.score) / single.outOf * 100);
    }
    return single.percent;
  }

  // individual assignment's contribution to overall
  getPts(index, type = 'assigns') {
    const single = this[type][index];
    if (single.points == null && single.score != null) {
      const percent = this.getPercent(index, type);
      const cat = this.cats[single.category];
      const totalPts = this.catTotal(single.category);
      single.points = percent * (single.outOf / totalPts) * cat.weight / 100;
    }
    return single.points;
  }

  // sum of assignment points = overall grade
  overall() {
    if (this.grade == null) {
      this.grade = this.scored
        .reduce((total, _, index) => total + this.getPts(index), 0);
    }
    return this.grade;
  }

  // round to two digits
  static format(n) {
    return n.toFixed(2);
  }
}
