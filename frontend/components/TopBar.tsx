import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, shadows } from '../constants/theme';

interface TopBarProps {
  title: string;
  subtitle?: string;
  dateRange?: string;
  onDateRangeChange?: (range: string) => void;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
}

const DATE_OPTIONS = ['Today', '7D', '30D', '90D'];

export default function TopBar({
  title,
  subtitle,
  dateRange = '7D',
  onDateRangeChange,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}: TopBarProps) {
  return (
    <View style={styles.topBar}>
      <View style={styles.leftCol}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.rightCol}>
        {/* Date Filter Range */}
        {onDateRangeChange && (
          <View style={styles.rangeGroup}>
            {DATE_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.rangeBtn,
                  dateRange === opt && styles.rangeBtnActive,
                ]}
                onPress={() => onDateRangeChange(opt)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.rangeText,
                    dateRange === opt && styles.rangeTextActive,
                  ]}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Secondary Action */}
        {secondaryLabel && (
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={onSecondaryAction}
            activeOpacity={0.7}
          >
            <Text style={styles.secondaryBtnText}>{secondaryLabel}</Text>
          </TouchableOpacity>
        )}

        {/* Primary Action Button */}
        {actionLabel && (
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onAction}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>{actionLabel}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  leftCol: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  rangeGroup: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    padding: 2.5,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  rangeBtn: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 4,
  },
  rangeBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadows.sm,
  },
  rangeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  rangeTextActive: {
    color: '#0F172A',
    fontWeight: '600',
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  secondaryBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  primaryBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    ...shadows.sm,
  },
  primaryBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
