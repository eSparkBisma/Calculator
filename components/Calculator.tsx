import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import darkTheme, {Theme} from '../themes/dark';
import lightTheme from '../themes/light';
import nightShadeTheme from '../themes/night';
import {useHookstate} from '@hookstate/core';
import Header from './Header';
import {OperationButton} from './OperationButton';
import buttonStore from '../store/store';
import {StyleSheet} from 'react-native';

const Calculator: React.FC = () => {
  const theme = useHookstate<Theme>(darkTheme);
  const isMenuOpen = useHookstate(false);
  const themes = ['dark', 'light', 'nightShade'];
  const buttons = useHookstate(buttonStore.buttons);
  const inputValueState = useHookstate<string>('');
  const historyState = useHookstate<string>('');
  const equalsPressed = useHookstate<boolean>(buttonStore.equalsPressed);

  const handleThemeChange = (themeName: string) => {
    switch (themeName) {
      case 'dark':
        theme.set(darkTheme);
        console.log(theme.name.value);
        break;
      case 'light':
        theme.set(lightTheme);
        console.log(theme.name.value);
        break;
      case 'nightShade':
        theme.set(nightShadeTheme);
        console.log(theme.name.value);
        break;
      default:
        break;
    }
    isMenuOpen.set(false);
  };

  const handleOperation = (operation: string) => {
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

        expressionToEvaluate = expressionToEvaluate.replace(
          /√(\d+(\.\d+)?)/g,
          (_, num) => {
            const operand = parseFloat(num);
            if (!isNaN(operand)) {
              return Math.sqrt(operand).toString();
            }
            return 'NaN';
          },
        );
        result = eval(expressionToEvaluate).toString();

        historyState.set('');
        historyState.set(`${historyState.value}${inputValueState.value}`);
        inputValueState.set(result);
      } catch (error) {
        console.error(error);
      }
    } else if (operation === 'bckspc' && inputValueState.value.length > 0) {
      inputValueState.set(prevValue => prevValue.slice(0, -1));
    } else if (operation === '%') {
      try {
        const result = eval(inputValueState.value) / 100;
        inputValueState.set(result.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      inputValueState.set(prevValue => prevValue + operation);
    }
  };

  const handleClear = (
    bOps?: string,
    bType?: 'number' | 'operation',
    bValue?: number,
  ): void => {
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.topbg.value,
        justifyContent: 'space-between',
      }}>
      <Header
        theme={theme}
        onMenuPress={() => isMenuOpen.set(!isMenuOpen.get())}
        onPress={() => {
          equalsPressed.set(false);
          handleOperation('√');
        }}
      />
      {isMenuOpen.get() && (
        <View
          style={{
            position: 'absolute',
            top: 55,
            right: 22,
            backgroundColor: theme.menu.value,
            zIndex: 5,
          }}>
          {/* theme.menu.value */}
          {themes.map((themeName, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleThemeChange(themeName);
              }}
              style={{padding: 10}}>
              <Text
                style={[
                  styles.menuText,
                  {
                    color:
                      theme.name.value === 'light'
                        ? 'black'
                        : theme.name.value === 'nightShade'
                        ? '#e9e7e7'
                        : '#c2bebe',
                  },
                ]}>
                {themeName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View>
        <View style={styles.containText}>
          <Text style={[styles.history, {color: theme.historyText.value}]}>
            {historyState.value}
          </Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={text => inputValueState.set(text)}
            value={
              inputValueState.value.length > 11
                ? inputValueState.value.substring(0, 11)
                : inputValueState.value
            }
            style={[styles.input, {color: theme.text.value}]}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            padding: '2%',
            backgroundColor: theme.lowbg.value,
          }}>
          {buttons.get().map((button, index) => {
            const validIconLibrary = ['FontAwesome6', 'Ionicons'];
            const iconLibrary = validIconLibrary.includes(
              button.iconLibrary as string,
            )
              ? (button.iconLibrary as 'FontAwesome6' | 'Ionicons')
              : undefined;

            return (
              <View
                key={index}
                style={{
                  width: '25%', // 4 columns (100% / 4 = 25%)
                  height: 20,
                  aspectRatio: 1.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}>
                <OperationButton
                  label={button?.label}
                  iconName={button?.iconName}
                  iconLibrary={iconLibrary}
                  buttonStyle={
                    (styles.button,
                    {
                      backgroundColor:
                        button.type === 'number'
                          ? theme.numberButtonBackground.value
                          : button.operation === '='
                          ? theme.equalsButton.value
                          : theme.operationbuttonBackground.value,
                    })
                  }
                  color={
                    button.operation === '='
                      ? 'white'
                      : button.operation === 'c' &&
                        theme.name.value === 'nightShade'
                      ? '#b64f1fdf'
                      : theme.operationText.value
                  }
                  textColor={theme.numberText.value}
                  onPress={() => {
                    if (
                      button.type === 'number' ||
                      button.type === 'operation'
                    ) {
                      const operation =
                        button?.operation || button?.label || '';
                      handleOperation(operation);
                      handleClear(button.operation, button.type, button.value);
                    }
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  button: {
    // backgroundColor:
  },
  containText: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  history: {
    fontWeight: '500',
    fontSize: 25,
    paddingRight: 5,
  },
  input: {
    fontSize: 40,
    fontWeight: '700',
  },
  menuText: {
    fontSize: 15,
  },
});
