import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import darkTheme, {Theme} from '../themes/dark';
import lightTheme from '../themes/light';
import nightShadeTheme from '../themes/night';
import {hookstate, useHookstate} from '@hookstate/core';
import Header from './Header';
import {OperationButton} from './OperationButton';
import buttonStore from '../store/store';

const Calculator: React.FC = () => {
  // const theme = useHookstate<Theme>(darkTheme);
  // const toggleDarkTheme = () => theme.set(darkTheme);
  // const toggleLightTheme = () => theme.set(lightTheme);
  // const toggleNightShadeTheme = () => theme.set(nightShadeTheme);
  // const handleThemeChange = (themeName: string) => {
  //   switch (themeName) {
  //     case 'dark':
  //       toggleDarkTheme();
  //       break;
  //     case 'light':
  //       toggleLightTheme();
  //       break;
  //     case 'nightShade':
  //       toggleNightShadeTheme();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const themes = ['dark', 'light', 'nightShade'];

  const buttons = useHookstate(buttonStore.buttons);

  const handleOperation = (operation: string) => {
    console.log(`Button pressed: ${operation}`);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header />
      <View>
        {buttons.get().map((button, index) => {
          const validIconLibrary = ['FontAwesome6', 'Ionicons'];
          const iconLibrary = validIconLibrary.includes(
            button.iconLibrary as string,
          )
            ? (button.iconLibrary as 'FontAwesome6' | 'Ionicons')
            : undefined;

          return (
            <OperationButton
              key={index}
              label={button?.label}
              iconName={button?.iconName}
              iconLibrary={iconLibrary}
              onPress={() => {
                if (button.type === 'number' || button.type === 'operation') {
                  const operation = button?.operation || button?.label || '';
                  handleOperation(operation);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Calculator;
