import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export default function StatusBadge({
  label,
  variant = 'neutral',
  size = 'md',
  dot = false,
}: StatusBadgeProps) {
  const variantStyles = {
    success: {
      bg: '#ECFDF5',
      border: '#A7F3D0',
      text: '#065F46',
      dotColor: '#10B981',
    },
    warning: {
      bg: '#FFFBEB',
      border: '#FDE68A',
      text: '#92400E',
      dotColor: '#F59E0B',
    },
    danger: {
      bg: '#FEF2F2',
      border: '#FECACA',
      text: '#991B1B',
      dotColor: '#EF4444',
    },
    info: {
      bg: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1E40AF',
      dotColor: '#2563EB',
    },
    neutral: {
      bg: '#F1F5F9',
      border: '#E2E8F0',
      text: '#334155',
      dotColor: '#64748B',
    },
  }[variant];

  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: variantStyles.bg,
          borderColor: variantStyles.border,
          paddingVertical: isSmall ? 2 : 4,
          paddingHorizontal: isSmall ? 6 : 8,
        },
      ]}
    >
      {dot && (
        <View
          style={[
            styles.dot,
            {
              backgroundColor: variantStyles.dotColor,
              width: isSmall ? 4 : 6,
              height: isSmall ? 4 : 6,
            },
          ]}
        />
      )}
      <Text
        style={[
          styles.text,
          {
            color: variantStyles.text,
            fontSize: isSmall ? 10 : 11,
          },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    alignSelf: 'flex-start',
    gap: 5,
  },
  dot: {
    borderRadius: 9999,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
