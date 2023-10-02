import React from 'react';
import {View} from 'react-native';
import IconButton from './IconButton';
import {Theme} from '../themes/dark';
import {State} from '@hookstate/core';

interface HeaderProps {
  onMenuPress: () => void;
  onSqrtPress: () => void;
  theme: State<Theme, {}>;
}
const Header: React.FC<HeaderProps> = ({onMenuPress, onSqrtPress, theme}) => {
  return (
    <View
      style={{
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: ' 5%',
      }}>
      <IconButton
        source={require('../icons/sqrt.png')}
        width={25}
        height={25}
        onPress={onSqrtPress}
        color={theme.headerIcon.value}
      />
      <IconButton
        source={require('../icons/menu.png')}
        width={25}
        height={25}
        onPress={onMenuPress}
        color={theme.headerIcon.value}
      />
    </View>
  );
};

export default Header;
