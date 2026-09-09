import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, shadows } from '../constants/theme';
import StatusBadge, { BadgeVariant } from './StatusBadge';
import { OpportunityItem } from '../mock/merchantData';

interface OpportunityCardProps {
  opportunity: OpportunityItem;
  onPress: (opp: OpportunityItem) => void;
  onActionPress?: (opp: OpportunityItem) => void;
}

export default function OpportunityCard({
  opportunity,
  onPress,
  onActionPress,
}: OpportunityCardProps) {
  const getCategoryBadge = (cat: string): { label: string; variant: BadgeVariant } => {
    switch (cat) {
      case 'INVENTORY':
        return { label: 'Inventory Risk', variant: 'danger' };
      case 'MARGIN':
        return { label: 'Margin Leak', variant: 'warning' };
      case 'GROWTH':
        return { label: 'Cross-Sell Upside', variant: 'success' };
      case 'DEAD_STOCK':
        return { label: 'Dead Stock', variant: 'neutral' };
      default:
        return { label: cat, variant: 'info' };
    }
  };

  const getPriorityBadge = (p: string): { label: string; variant: BadgeVariant } => {
    switch (p) {
      case 'HIGH':
        return { label: 'High Priority', variant: 'danger' };
      case 'MEDIUM':
        return { label: 'Medium', variant: 'warning' };
      default:
        return { label: 'Opportunity', variant: 'success' };
    }
  };

  const catMeta = getCategoryBadge(opportunity.category);
  const prioMeta = getPriorityBadge(opportunity.priority);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(opportunity)}
      activeOpacity={0.92}
    >
      <View style={styles.inner}>
        {/* Header row: Badges + Confidence */}
        <View style={styles.topRow}>
          <View style={styles.badgeGroup}>
            <StatusBadge label={prioMeta.label} variant={prioMeta.variant} size="sm" dot />
            <StatusBadge label={catMeta.label} variant={catMeta.variant} size="sm" />
          </View>
          <View style={styles.confidencePill}>
            <Text style={styles.confidenceText}>{opportunity.confidence}% confidence</Text>
          </View>
        </View>

        {/* Title & Explanation */}
        <Text style={styles.title}>{opportunity.title}</Text>
        <Text style={styles.explanation} numberOfLines={2}>
          {opportunity.explanation}
        </Text>

        {/* Structured Action & Impact Grid */}
        <View style={styles.recommendationBox}>
          <View style={styles.recCol}>
            <Text style={styles.recLabel}>Recommended Action</Text>
            <Text style={styles.recActionText} numberOfLines={2}>
              {opportunity.recommendedAction}
            </Text>
          </View>
          <View style={styles.impactDivider} />
          <View style={styles.impactCol}>
            <Text style={styles.impactLabel}>Estimated Impact</Text>
            <Text style={styles.impactValue}>{opportunity.estimatedImpact}</Text>
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footerRow}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={e => {
              e.stopPropagation();
              if (onActionPress) onActionPress(opportunity);
              else onPress(opportunity);
            }}
          >
            <Text style={styles.actionBtnText}>{opportunity.actionLabel} →</Text>
          </TouchableOpacity>
          <Text style={styles.viewDetailLink}>View evidence & telemetry</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    ...shadows.sm,
  },
  inner: {
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeGroup: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  confidencePill: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: 5,
  },
  explanation: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 12,
  },
  recommendationBox: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    marginBottom: 12,
    gap: 12,
  },
  recCol: {
    flex: 1.4,
  },
  recLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  recActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    lineHeight: 16,
  },
  impactDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  impactCol: {
    flex: 1,
    justifyContent: 'center',
  },
  impactLabel: {
    fontSize: 9.5,
    fontWeight: '600',
    color: '#047857',
    marginBottom: 2,
  },
  impactValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#047857',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  actionBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '600',
  },
  viewDetailLink: {
    fontSize: 11.5,
    color: '#2563EB',
    fontWeight: '600',
  },
});
