import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {useHookstate} from '@hookstate/core';
import Header from './Header';
import {OperationButton} from './OperationButton';
import buttonStore from '../store/store';
import {
  handleClear,
  handleOperation,
  handleThemeChange,
  useEqualsPressedHook,
  useHistoryHook,
  useInputValueHook,
  useMenuOpenHook,
  useThemeHook,
} from '../utils/functions';

const Calculator: React.FC = () => {
  const theme = useThemeHook();
  const isMenuOpen = useMenuOpenHook();
  const inputValueState = useInputValueHook();
  const historyState = useHistoryHook();
  const equalsPressed = useEqualsPressedHook();
  const themes = ['dark', 'light', 'nightShade'];
  const buttons = useHookstate(buttonStore.buttons);

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
          handleOperation('√', inputValueState, historyState, equalsPressed);
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
                handleThemeChange(themeName, theme, isMenuOpen);
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
                      handleOperation(
                        operation,
                        inputValueState,
                        historyState,
                        equalsPressed,
                      );
                      handleClear(
                        button.operation,
                        button.type,
                        button.value,
                        equalsPressed,
                        inputValueState,
                      );
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
