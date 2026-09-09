import React from 'react';
import {
  View, Text, StyleSheet, Modal, ScrollView, TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, radius, shadows } from '../constants/theme';
import StatusBadge from './StatusBadge';
import { OpportunityItem } from '../mock/merchantData';
import Svg, { Rect, Line, Text as SvgText, Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface OpportunityDetailProps {
  opportunity: OpportunityItem | null;
  visible: boolean;
  onClose: () => void;
  onTakeAction: (opportunity: OpportunityItem) => void;
  onDismiss: (opportunityId: string) => void;
}

export default function OpportunityDetail({
  opportunity,
  visible,
  onClose,
  onTakeAction,
  onDismiss,
}: OpportunityDetailProps) {
  if (!opportunity) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.sidePanel}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTags}>
              <StatusBadge
                label={opportunity.priority}
                variant={opportunity.priority === 'HIGH' ? 'danger' : 'warning'}
                size="sm"
                dot
              />
              <StatusBadge
                label={opportunity.category.replace('_', ' ')}
                variant="neutral"
                size="sm"
              />
              <View style={styles.confidenceChip}>
                <Text style={styles.confidenceText}>
                  {opportunity.confidence}% Algorithmic Confidence
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Title & Core Summary */}
            <Text style={styles.detailTitle}>{opportunity.title}</Text>

            {/* Section 1: Context */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Context & Findings</Text>
              <Text style={styles.sectionText}>{opportunity.explanation}</Text>
            </View>

            {/* Section 2: Why It Matters & ₹ Impact */}
            <View style={styles.impactCard}>
              <View style={styles.impactHeader}>
                <Text style={styles.impactCardLabel}>Estimated Financial Impact</Text>
                <Text style={styles.impactCardValue}>{opportunity.estimatedImpact}</Text>
              </View>
              <Text style={styles.impactCardSub}>
                Calculated using your last 30 days of point-of-sale volume and distributor purchase orders.
              </Text>
            </View>

            {/* Section 3: Supporting Telemetry Visualization */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Telemetry & Runway Simulation</Text>
              <View style={styles.chartBox}>
                <Svg width={300} height={90}>
                  {/* Grid lines */}
                  <Line x1="10" y1="20" x2="290" y2="20" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                  <Line x1="10" y1="55" x2="290" y2="55" stroke="#E2E8F0" strokeWidth="1" />
                  
                  {/* Projected curve */}
                  <Path
                    d="M10 25 Q 75 15, 140 40 T 280 75"
                    fill="none"
                    stroke={opportunity.priority === 'HIGH' ? '#EF4444' : '#2563EB'}
                    strokeWidth="2.5"
                  />
                  {/* Marker points */}
                  <Rect x="135" y="36" width="8" height="8" rx="4" fill="#2563EB" />
                  <Rect x="275" y="71" width="8" height="8" rx="4" fill="#EF4444" />

                  {/* Labels */}
                  <SvgText x="10" y="85" fontSize="9" fill="#64748B" fontWeight="600">Day -7 Baseline</SvgText>
                  <SvgText x="130" y="28" fontSize="9" fill="#2563EB" fontWeight="700">Today</SvgText>
                  <SvgText x="230" y="85" fontSize="9" fill="#EF4444" fontWeight="700">Depletion Point</SvgText>
                </Svg>
              </View>
            </View>

            {/* Section 4: Evidence & Signals */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Evidence & Store Signals</Text>
              {opportunity.evidence.map((item, idx) => (
                <View key={idx} style={styles.evidenceItem}>
                  <View style={styles.evidenceDot} />
                  <Text style={styles.evidenceText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Section 5: Recommended Action */}
            <View style={styles.recommendationPanel}>
              <Text style={styles.recHeader}>Recommended Next Step</Text>
              <Text style={styles.recText}>{opportunity.recommendedAction}</Text>
            </View>
          </ScrollView>

          {/* Action Bar */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.dismissBtn}
              onPress={() => onDismiss(opportunity.id)}
            >
              <Text style={styles.dismissBtnText}>Dismiss</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.executeBtn}
              onPress={() => onTakeAction(opportunity)}
            >
              <Text style={styles.executeBtnText}>{opportunity.actionLabel} →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sidePanel: {
    width: Math.min(width * 0.9, 480),
    backgroundColor: '#FFFFFF',
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#E2E8F0',
    ...shadows.elevated,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  headerTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  confidenceChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  body: {
    flex: 1,
    padding: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 24,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 20,
  },
  impactCard: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    padding: 14,
    marginBottom: 18,
  },
  impactHeader: {
    marginBottom: 4,
  },
  impactCardLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#065F46',
  },
  impactCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#047857',
    marginTop: 2,
  },
  impactCardSub: {
    fontSize: 11,
    color: '#065F46',
    lineHeight: 16,
    marginTop: 4,
  },
  chartBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  evidenceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  evidenceDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#2563EB',
    marginTop: 7,
  },
  evidenceText: {
    flex: 1,
    fontSize: 12.5,
    color: '#334155',
    lineHeight: 18,
  },
  recommendationPanel: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    padding: 14,
    marginBottom: 24,
  },
  recHeader: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#1E40AF',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  recText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E3A8A',
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  dismissBtn: {
    flex: 1,
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dismissBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  executeBtn: {
    flex: 2,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  executeBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
