import React from 'react';
import {View} from 'react-native';
import IconButton from './IconButton';
import {Theme} from '../themes/dark';
import {State} from '@hookstate/core';

interface HeaderProps {
  onMenuPress: () => void;
  onPress: () => void;
  theme: State<Theme, {}>;
}
const Header: React.FC<HeaderProps> = ({onMenuPress, onPress, theme}) => {
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
        onPress={onPress}
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
