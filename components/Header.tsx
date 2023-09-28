import React from 'react';
import {View} from 'react-native';
import IconButton from './IconButton';

const Header: React.FC = () => {
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
        onPress={() => console.log('sqrt pressed')}
      />
      <IconButton
        source={require('../icons/menu.png')}
        width={25}
        height={25}
        onPress={() => console.log('menu button pressed')}
      />
    </View>
  );
};

export default Header;
