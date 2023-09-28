import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
  Image,
  StyleProp,
  ImageStyle,
} from 'react-native';
import {Text} from 'react-native-paper';

import FA6icon from 'react-native-vector-icons/FontAwesome6';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface IconButtonprops {
  // source:?
  onPress?: () => void;
  color?: string;
  source?: ImageSourcePropType;
  label?: string;
  iconName?: string;
  iconLibrary?: 'FontAwesome6' | 'Ionicons';
  buttonStyle?: ViewStyle;
  width?: number; // Use lowercase "number" instead of "Number"
  height?: number; // Use lowercase "number" instead of "Number"
}

const IconButton: React.FC<IconButtonprops> = ({
  onPress,
  source,
  iconName = '',
  label,
  buttonStyle,
  color,
  width, // Use lowercase "width" instead of "Width"
  height,
  iconLibrary, // Use lowercase "height" instead of "Height"
}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      {source ? (
        <Image
          source={source}
          style={{
            width: width,
            height: height,
            resizeMode: 'contain',
            paddingRight: 5,
            tintColor: color,
          }}
        />
      ) : iconLibrary === 'FontAwesome6' ? (
        <FA6icon name={iconName} size={30} color={color} />
      ) : iconLibrary === 'Ionicons' ? (
        <Ionicon name={iconName} size={30} color={color} />
      ) : (
        <Text>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: '1%',
    paddingHorizontal: '2.5%',
    // borderRadius: 25,
    // borderWidth: 2,
    // borderColor: '#f0f0f0',
  },
});

export default IconButton;
