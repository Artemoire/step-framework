const { job } = require('./core/Job');

const runJob = async (job, step, ctx) => {
  job.setContext(ctx);
  do {
    step = await job.runStep(step);
  } while (step !== undefined);
}

const isIndexedListAtEnd = ({ curr, list }) => list.length === curr;
const incrementIndexedList = ({ curr, list }) => ({ curr: curr + 1, list });
const currentIndexedElement = ({ curr, list }) => list[curr];
const indexAList = (list) => ({ curr: 0, list });

const work = job();

work.onStep('init', (ctx, setContext) => {
  console.log('[START]');
  if (!Array.isArray(ctx)) return 'error_not_a_list'
  setContext(indexAList(ctx));
  return 'iterate';
});

work.onStep('iterate', (ctx, setContext) => {
  if (isIndexedListAtEnd(ctx)) return 'done';
  console.log(`Iterating: ${currentIndexedElement(ctx)}`)
  setContext(incrementIndexedList(ctx));
  return 'iterate';
})

work.onStep('done', () => {
  console.log('[FINISH]');
})

work.onStep('error_not_a_list', (ctx) => {
  console.log(`Not a list: ${ctx}`);
})

runJob(work, 'init', [5, 'ab']);