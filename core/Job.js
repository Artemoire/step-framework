class Job {

  constructor() {
    this.steps = {};
    this.ctx = {};
  }

  onStep(step, stepAction) {
    this.steps[step] = stepAction;
  }

  setContext(ctx) {
    this.ctx = ctx;
  }

  async runStep(step) {
    const stepAction = this.steps[step];
    const nextStep = await stepAction(this.ctx, (ctx) => this.setContext(ctx));
    return nextStep;
  }

  static from() {
    return new Job();
  }

}

module.exports = { Job, job: Job.from };