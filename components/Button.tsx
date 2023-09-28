import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  color?: string;
  source?: ImageSourcePropType;
  iconName?: string;
}

const Button: React.FC<ButtonProps> = ({label, onPress, buttonStyle}) => {
  return (
    <TouchableOpacity
      style={[defaultButtonStyle, buttonStyle]}
      onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const defaultButtonStyle: ViewStyle = {
  borderRadius: 50,
  padding: '1%',
};

export default Button;
