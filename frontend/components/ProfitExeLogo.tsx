import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

interface ProfitExeLogoProps {
  variant?: 'mark' | 'horizontal' | 'stacked';
  size?: 'sm' | 'md' | 'lg';
  showDescriptor?: boolean;
  inverted?: boolean;
}

export const ProfitExeMark = ({ size = 28, inverted = false }: { size?: number; inverted?: boolean }) => {
  const bg = inverted ? '#1E293B' : '#0F172A';

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Precision container tile */}
      <Rect x="2" y="2" width="28" height="28" rx="6" fill={bg} />
      {/* Minimal terminal command glyph: > */}
      <Path
        d="M9 11L15 16L9 21"
        stroke="#FFFFFF"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Active executing cursor indicator: _ */}
      <Path
        d="M18 21H23"
        stroke="#10B981"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default function ProfitExeLogo({
  variant = 'horizontal',
  size = 'md',
  showDescriptor = false,
  inverted = false,
}: ProfitExeLogoProps) {
  const markSizes = { sm: 22, md: 28, lg: 38 };
  const textSizes = { sm: 15, md: 18, lg: 24 };

  const markSize = markSizes[size];
  const textSize = textSizes[size];
  const textColor = inverted ? '#FFFFFF' : '#0F172A';
  const extColor = '#2563EB';
  const subColor = inverted ? '#94A3B8' : '#64748B';

  if (variant === 'mark') {
    return <ProfitExeMark size={markSize} inverted={inverted} />;
  }

  return (
    <View style={[styles.container, variant === 'stacked' ? styles.stacked : styles.horizontal]}>
      <ProfitExeMark size={markSize} inverted={inverted} />
      <View style={[styles.textWrap, variant === 'stacked' && styles.textCenter]}>
        <View style={styles.titleRow}>
          <Text style={[styles.brandText, { fontSize: textSize, color: textColor }]}>
            profit
          </Text>
          <Text style={[styles.brandExt, { fontSize: textSize, color: extColor }]}>
            .exe
          </Text>
        </View>
        {showDescriptor && (
          <Text style={[styles.descriptor, { color: subColor }]}>
            AI-powered business intelligence for small merchants.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  stacked: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  textWrap: {
    justifyContent: 'center',
  },
  textCenter: {
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  brandText: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandExt: {
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  descriptor: {
    fontSize: 10.5,
    fontWeight: '500',
    marginTop: 3,
    textAlign: 'center',
  },
});
