import {useHookstate} from '@hookstate/core';
import darkTheme, {Theme} from '../themes/dark';
import lightTheme from '../themes/light';
import nightShadeTheme from '../themes/night';
import buttonStore from '../store/store';

export const useThemeHook = () => useHookstate<Theme>(darkTheme);
export const useMenuOpenHook = () => useHookstate(false);
export const useInputValueHook = () => useHookstate<string>('');
export const useHistoryHook = () => useHookstate<string>('');
export const useEqualsPressedHook = () =>
  useHookstate<boolean>(buttonStore.equalsPressed);

export const handleThemeChange = (
  themeName: string,
  theme: any,
  isMenuOpen: any,
) => {
  switch (themeName) {
    case 'dark':
      theme.set(darkTheme);
      isMenuOpen.set(false);
      break;
    case 'light':
      theme.set(lightTheme);
      isMenuOpen.set(false);
      break;
    case 'nightShade':
      theme.set(nightShadeTheme);
      isMenuOpen.set(false);
      break;
    default:
      break;
  }
};

export const handleOperation = (
  operation: string,
  inputValueState: any,
  historyState: any,
  equalsPressed: any,
) => {
  inputValueState.value.length > 11
    ? inputValueState.set(inputValueState.value.substring(0, 11))
    : inputValueState.value;
  if (operation === 'c') {
    inputValueState.set('');
    historyState.set('');
  } else if (operation === '=') {
    try {
      let result = '';
      let expressionToEvaluate = inputValueState.value;
      var pattern = /\d+√\d+/;
      const sqrtPattern = /√(\d+(\.\d+)?)/g;

      while (pattern.test(expressionToEvaluate)) {
        expressionToEvaluate = expressionToEvaluate.replace(
          /(\d+(\.\d+)?)√(\d+(\.\d+)?)/g,
          (_: any, num1: any, __: any, num2: any) => {
            const operand1 = parseFloat(num1);
            const operand2 = parseFloat(num2);
            if (!isNaN(operand1) && !isNaN(operand2)) {
              return (operand1 * Math.sqrt(operand2)).toString();
            }
            return 'NaN';
          },
        );
      }
      while (sqrtPattern.test(expressionToEvaluate)) {
        expressionToEvaluate = expressionToEvaluate.replace(
          /√(\d+(\.\d+)?)/g,
          (_: any, num: any) => {
            const operand = parseFloat(num);
            if (!isNaN(operand)) {
              return Math.sqrt(operand).toString();
            }
            return 'NaN';
          },
        );
      }
      result = eval(expressionToEvaluate).toString();
      historyState.set('');
      historyState.set(`${historyState.value}${inputValueState.value}`);
      inputValueState.set(result);
    } catch (error) {
      console.error(error);
    }
  } else if (operation === 'bckspc' && inputValueState.value.length > 0) {
    inputValueState.set((prevValue: any) => prevValue.slice(0, -1));
  } else if (operation === '%') {
    try {
      const result = eval(inputValueState.value) / 100;
      inputValueState.set(result.toString());
    } catch (error) {
      console.error(error);
    }
  } else if (operation !== 'bckspc') {
    inputValueState.set((prevValue: any) => prevValue + operation);
  }
};

export const handleClear = (
  bOps?: string,
  bType?: 'number' | 'operation',
  bValue?: number,
  equalsPressed?: any,
  inputValueState?: any,
) => {
  if (equalsPressed.get() && bType === 'operation') {
    equalsPressed.set(false);
  }
  if (equalsPressed.get() && bType === 'number') {
    const inputValue = inputValueState.value.toString();
    console.log('input value now', inputValue);
    inputValueState.set(bValue?.toString() || '');
    equalsPressed.set(false);
  } else if (!equalsPressed.get()) {
    if (bOps == '=') {
      equalsPressed.set(true);
    }
  }
};
