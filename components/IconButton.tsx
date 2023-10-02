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
  buttonStyle?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  textColor?: string;
}

const IconButton: React.FC<IconButtonprops> = ({
  onPress,
  source,
  iconName = '',
  label,
  buttonStyle,
  color,
  textColor,
  width,
  height,
  iconLibrary,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle as ViewStyle]}
      onPress={onPress}>
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
        <Text style={{fontSize: 28, textAlign: 'center', color: textColor}}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1%',
    paddingHorizontal: '2.5%',
  },
});

export default IconButton;
