import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius, shadows } from '../constants/theme';

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  isPositive?: boolean;
  subtext?: string;
  accent?: string;
  badge?: string;
}

export default function KpiCard({
  label,
  value,
  delta,
  isPositive = true,
  subtext,
  badge,
}: KpiCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>

      <Text style={styles.value}>{value}</Text>

      {(delta || subtext) && (
        <View style={styles.footerRow}>
          {delta && (
            <View
              style={[
                styles.deltaPill,
                {
                  backgroundColor: isPositive ? '#ECFDF5' : '#FEF2F2',
                  borderColor: isPositive ? '#A7F3D0' : '#FECACA',
                },
              ]}
            >
              <Text
                style={[
                  styles.deltaText,
                  { color: isPositive ? '#065F46' : '#991B1B' },
                ]}
              >
                {delta}
              </Text>
            </View>
          )}
          {subtext && <Text style={styles.subtext}>{subtext}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  badge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#475569',
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  deltaPill: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 1,
  },
  deltaText: {
    fontSize: 11,
    fontWeight: '600',
  },
  subtext: {
    fontSize: 11,
    color: '#64748B',
    flexShrink: 1,
  },
});
