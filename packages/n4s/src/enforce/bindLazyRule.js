
import { RUN_RULE } from 'enforceKeywords';
import genRuleProxy from 'genRuleProxy';
import isFunction from 'isFunction';
import runtimeRules from 'runtimeRules';
import setFnName from 'setFnName';
import withArgs from 'withArgs';

// Initiates a chain of functions directly from the `enforce`
// function - that's even though we do not have any closure
// there to store that data.
export default function bindLazyRule(ruleName) {
  const registeredRules = [];

  const addFn = fnName =>
    withArgs(args => {
      registeredRules.push(
        setFnName(value => runtimeRules[fnName](value, ...args), fnName)
      );

      const returnvalue = genRuleProxy({}, addFn);

      return Object.assign(returnvalue, {
        [RUN_RULE]: getValue => {
          return registeredRules.every(fn => {
            try {
              // This  inversion of control when getting the value is
              // required in order to pass the function over to `shape`
              // so it can make the decision which args to pass to `optional`
              return !!fn(isFunction(getValue) ? getValue(fn.name) : getValue);
            } catch (e) {
              return false;
            }
          });
        },
      });
    });

  return addFn(ruleName);
}
