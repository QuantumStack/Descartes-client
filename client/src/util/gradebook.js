export default class {
  constructor(assigns, cats) {
    this.assigns = assigns;
    this.sort();
    this.cats = cats;
    this.grade = null;
  }

  // assignments that have non-null score
  get scored() {
    return this.assigns.filter(a => a.score != null);
  }

  // sort assignments by some parameter
  sort(param = 'date', order = 1) {
    this.assigns = this.assigns.sort(({ [param]: a }, { [param]: b}) => 
      (a < b ? -1 :  (a > b ? 1 : 0)) * order);
  }

  // update assignment score and re-compute grade
  update(index, score) {
    const single = this.assigns[index];
    single.score = score;
    single.updated = true;
    this.getPts(index, 'assigns', true);
    this.catScore(single.category, true);
    this.overall(true);
  }

  // sum of assignment scores in a category
  catScore(name, force) {
    const cat = this.cats[name];
    if (force || cat.score == null) {
      cat.score = this.scored
        .filter(a => a.category === name)
        .reduce((total, a) =>
          total + (a.override ? a.override / 100 * a.out_of : a.score));
    }
    return cat.score;
  }

  // sum of assignment out_of points in a category
  catTotal(name, force) {
    const cat = this.cats[name]
    if (force || cat.out_of == null) {
      cat.out_of = this.scored
        .filter(a => a.category === name)
        .reduce((total, a) => total + a.out_of, 0);
    }
    return cat.out_of;
  }

  // score out of 100 for assignment
  getPercent(index, type = 'assigns', force) {
    const single = this[type][index];
    if (force || single.percent == null) {
      single.percent = single.override || (single.score / single.out_of * 100);
    }
    return single.percent;
  }

  // individual assignment's contribution to overall
  getPts(index, type = 'assigns', force) {
    const single = this[type][index];
    if ((force || single.points == null) && single.score != null) {
      const percent = this.getPercent(index, type, force);
      const cat = this.cats[single.category];
      const totalPts = this.catTotal(single.category, force);
      single.points = percent * (single.out_of / totalPts) * cat.weight / 100;
    }
    return single.points;
  }

  // sum of assignment points = overall grade
  overall(force) {
    if (force || this.grade == null) {
      this.grade = this.assigns
        .reduce((total, a, index) =>
          a.score == null ? total : total + this.getPts(index), 0);
    }
    return this.grade;
  }

  // round to two digits
  static format(n) {
    return n.toFixed(2);
  }
}
