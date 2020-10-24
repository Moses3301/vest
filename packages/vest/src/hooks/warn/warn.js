import throwError from 'throwError';
import context from 'ctx';
import { ERROR_HOOK_CALLED_OUTSIDE } from '../constants';
import { ERROR_OUTSIDE_OF_TEST } from './constants';

/**
 * Sets a running test to warn only mode.
 */
const warn = () => {
  const ctx = context.use();

  if (!ctx) {
    throwError('warn ' + ERROR_HOOK_CALLED_OUTSIDE);
    return;
  }

  if (!ctx.currentTest) {
    throwError(ERROR_OUTSIDE_OF_TEST);
    return;
  }

  ctx.currentTest.warn();
};

export default warn;
