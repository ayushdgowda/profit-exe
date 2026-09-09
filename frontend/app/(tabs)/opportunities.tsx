import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Alert, Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius, shadows } from '../../constants/theme';
import TopBar from '../../components/TopBar';
import OpportunityCard from '../../components/OpportunityCard';
import OpportunityDetail from '../../components/OpportunityDetail';
import { mockOpportunities, OpportunityItem } from '../../mock/merchantData';

const { width } = Dimensions.get('window');

export default function OpportunitiesScreen() {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>(mockOpportunities);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'INVENTORY' | 'MARGIN' | 'GROWTH' | 'DEAD_STOCK'>('ALL');
  const [activeOpportunity, setActiveOpportunity] = useState<OpportunityItem | null>(null);
  const [dateRange, setDateRange] = useState('7D');

  const filtered = opportunities.filter(opp => {
    if (selectedFilter === 'ALL') return true;
    return opp.category === selectedFilter;
  });

  const totalImpact = opportunities.reduce((acc, curr) => acc + curr.impactNumeric, 0);
  const highPriorityCount = opportunities.filter(o => o.priority === 'HIGH').length;

  const handleTakeAction = (opp: OpportunityItem) => {
    setActiveOpportunity(null);
    if (opp.targetTab === 'inventory') {
      router.push('/(tabs)/inventory');
    } else if (opp.targetTab === 'billing') {
      router.push('/(tabs)/billing');
    } else {
      Alert.alert(
        "Action Executed",
        `Recommendation for "${opp.title}" has been staged to your merchant console.`
      );
    }
  };

  const handleDismiss = (id: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== id));
    setActiveOpportunity(null);
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="AI Opportunity Engine"
        subtitle="Autonomous intelligence surfacing revenue upside and risk prevention for your store."
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        actionLabel="Run Fresh Scan"
        onAction={() => {
          Alert.alert("Engine Refreshed", "Scanned 148 SKUs and 42 recent transactions. All opportunity models are up to date.");
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Strategic Overview Strip */}
        <View style={styles.statsStrip}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Identified Impact</Text>
            <Text style={[styles.statValue, { color: '#047857' }]}>
              ₹{totalImpact.toLocaleString('en-IN')}
            </Text>
            <Text style={styles.statSub}>Recoverable margin & protected revenue</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>High Attention</Text>
            <Text style={[styles.statValue, { color: '#B91C1C' }]}>
              {highPriorityCount} Issues
            </Text>
            <Text style={styles.statSub}>Requires immediate merchant decision</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Decision Accuracy</Text>
            <Text style={styles.statValue}>89.2%</Text>
            <Text style={styles.statSub}>Validated by historical sales telemetry</Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {[
            { id: 'ALL', label: `All (${opportunities.length})` },
            { id: 'INVENTORY', label: 'Inventory Risks' },
            { id: 'MARGIN', label: 'Margin Leaks' },
            { id: 'GROWTH', label: 'Cross-Sell Upside' },
            { id: 'DEAD_STOCK', label: 'Dead Stock' },
          ].map(f => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filterPill,
                selectedFilter === f.id && styles.filterPillActive,
              ]}
              onPress={() => setSelectedFilter(f.id as any)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === f.id && styles.filterTextActive,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Opportunity List */}
        <View style={styles.listSection}>
          <Text style={styles.listHeader}>
            Prioritized Recommendations ({filtered.length})
          </Text>

          {filtered.map(opp => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              onPress={o => setActiveOpportunity(o)}
              onActionPress={o => handleTakeAction(o)}
            />
          ))}

          {filtered.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No opportunities in this category</Text>
              <Text style={styles.emptySub}>
                Your store metrics in this section are running within optimal parameters.
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Interactive Detail Drawer */}
      <OpportunityDetail
        opportunity={activeOpportunity}
        visible={!!activeOpportunity}
        onClose={() => setActiveOpportunity(null)}
        onTakeAction={handleTakeAction}
        onDismiss={handleDismiss}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  statsStrip: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginBottom: 20,
    ...shadows.sm,
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    flex: 1,
    minWidth: 160,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.4,
    marginBottom: 2,
  },
  statSub: {
    fontSize: 11,
    color: '#64748B',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listSection: {
    marginTop: 4,
  },
  listHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 4,
  },
  emptySub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});
