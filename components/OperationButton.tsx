import React from 'react';
import Button from './Button';
import IconButton from './IconButton';
import {ImageSourcePropType} from 'react-native';

interface OperationButtonProps {
  label?: string;
  source?: ImageSourcePropType;
  iconName?: string;
  iconLibrary?: 'FontAwesome6' | 'Ionicons';
  onPress: () => void;
  width?: number;
  height?: number;
}

export const OperationButton: React.FC<OperationButtonProps> = ({
  label,
  source,
  iconName,
  onPress,
  width,
  height,
  iconLibrary,
}) => {
  return (
    <IconButton
      label={label}
      source={source}
      iconName={iconName}
      width={width}
      height={height}
      iconLibrary={iconLibrary}
      onPress={onPress}
    />
  );
};
