import React from 'react';
import IconButton from './IconButton';
import {ImageSourcePropType} from 'react-native';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from 'react-native-paper';
import {ViewStyle} from 'react-native';

interface OperationButtonProps {
  label?: string;
  source?: ImageSourcePropType;
  iconName?: string;
  iconLibrary?: 'FontAwesome6' | 'Ionicons';
  onPress: () => void;
  width?: number;
  height?: number;
  buttonStyle?: ViewStyle;
  color?: string;
  textColor?: string;
}

export const OperationButton: React.FC<OperationButtonProps> = ({
  label,
  source,
  iconName,
  onPress,
  width,
  height,
  iconLibrary,
  buttonStyle,
  color,
  textColor,
  ...props
}) => {
  return (
    <IconButton
      buttonStyle={[styles.button, buttonStyle]}
      label={label}
      source={source}
      iconName={iconName}
      width={width}
      height={height}
      iconLibrary={iconLibrary}
      onPress={onPress}
      color={color}
      textColor={textColor}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: 68,
    height: 68,
    borderRadius: 50,
  },
});
