// src/components/ui/ShopButton.tsx
import React, { memo } from 'react';
import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Typography from './Typography';
import { COLORS, SIZES } from '@constants/theme';

export interface ShopButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  accessibilityLabel?: string;
}

const ShopButton: React.FC<ShopButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const isOutline = variant === 'outline';
  const textColor = isOutline ? COLORS.primary : COLORS.surface;
  const indicatorColor = isOutline ? COLORS.primary : COLORS.surface;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isOutline ? styles.outlineButton : styles.primaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && !isLoading && styles.pressedButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isLoading}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityRole="button"
    >
      {isLoading ? (
        <ActivityIndicator color={indicatorColor} size="small" />
      ) : (
        <Typography
          variant="body1"
          color={textColor}
          style={[{ fontWeight: '700', textAlign: 'center' }, textStyle]}
        >
          {title}
        </Typography>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  disabledButton: {
    backgroundColor: '#CBD5E1',
    borderColor: '#CBD5E1',
    opacity: 0.6,
  },
  pressedButton: {
    opacity: 0.85,
  },
});

export default memo(ShopButton);
