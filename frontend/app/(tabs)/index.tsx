import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Dimensions, RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Circle, Line, Text as SvgText } from 'react-native-svg';
import { colors, radius, shadows, brand } from '../../constants/theme';
import TopBar from '../../components/TopBar';
import KpiCard from '../../components/KpiCard';
import OpportunityCard from '../../components/OpportunityCard';
import OpportunityDetail from '../../components/OpportunityDetail';
import StatusBadge from '../../components/StatusBadge';
import { fetchBills, fetchProducts, fetchTotalSales } from '../../services/api';
import {
  mockDashboardKpis,
  mockSalesPerformance,
  mockOpportunities,
  mockIndianBills,
  OpportunityItem,
} from '../../mock/merchantData';

const { width } = Dimensions.get('window');

// ── Clean Restrained Sales Velocity Chart ──────────────────────────────────────
function SalesVelocityChart({ data, width: chartW, height: chartH }: { data: any[]; width: number; height: number }) {
  const padL = 48, padR = 16, padT = 16, padB = 30;
  const w = chartW - padL - padR;
  const h = chartH - padT - padB;

  const vals = data.map(d => d.value);
  const maxV = Math.max(...vals) * 1.15;
  const minV = 0;
  const range = maxV - minV;

  const toX = (i: number) => padL + (i / (data.length - 1)) * w;
  const toY = (v: number) => padT + h - (v / range) * h;

  // Build path
  const currentPath = data.reduce((acc, p, i) => {
    const x = toX(i);
    const y = toY(p.value);
    return i === 0 ? `M${x},${y}` : `${acc} L${x},${y}`;
  }, '');

  const prevPath = data.reduce((acc, p, i) => {
    const x = toX(i);
    const y = toY(p.prevValue || p.value * 0.9);
    return i === 0 ? `M${x},${y}` : `${acc} L${x},${y}`;
  }, '');

  const yTicks = [0, Math.round(maxV * 0.33), Math.round(maxV * 0.66), Math.round(maxV)];

  return (
    <Svg width={chartW} height={chartH}>
      {/* Grid lines */}
      {yTicks.map((v, i) => {
        const y = toY(v);
        return (
          <React.Fragment key={i}>
            <Line
              x1={padL}
              y1={y}
              x2={chartW - padR}
              y2={y}
              stroke="#F1F5F9"
              strokeWidth={1}
            />
            <SvgText
              x={padL - 8}
              y={y + 4}
              fontSize={10}
              fill="#94A3B8"
              textAnchor="end"
              fontWeight="600"
            >
              ₹{(v / 1000).toFixed(0)}k
            </SvgText>
          </React.Fragment>
        );
      })}

      {/* Previous Period Line (Subtle Gray Dash) */}
      <Path
        d={prevPath}
        stroke="#CBD5E1"
        strokeWidth={1.75}
        strokeDasharray="4 4"
        fill="none"
      />

      {/* Current Period Line (Precision Blue) */}
      <Path
        d={currentPath}
        stroke="#2563EB"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
      />

      {/* Points */}
      {data.map((d, i) => (
        <Circle
          key={i}
          cx={toX(i)}
          cy={toY(d.value)}
          r={i === data.length - 1 ? 4.5 : 3}
          fill={i === data.length - 1 ? '#2563EB' : '#FFFFFF'}
          stroke="#2563EB"
          strokeWidth={2}
        />
      ))}

      {/* X Labels */}
      {data.map((d, i) => (
        <SvgText
          key={i}
          x={toX(i)}
          y={chartH - 8}
          fontSize={10}
          fill="#64748B"
          fontWeight="600"
          textAnchor="middle"
        >
          {d.label}
        </SvgText>
      ))}
    </Svg>
  );
}

export default function OverviewScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('Today');
  const [activeOpportunity, setActiveOpportunity] = useState<OpportunityItem | null>(null);
  const [bills, setBills] = useState<any[]>(mockIndianBills);

  useEffect(() => {
    loadLiveStoreData();
  }, []);

  const loadLiveStoreData = async () => {
    try {
      const realBills = await fetchBills();
      if (realBills && realBills.length > 0) {
        setBills(realBills);
      }
    } catch (e) {
      console.log('Real backend bill fetch fallback to verified dataset:', e);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadLiveStoreData();
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleTakeAction = (opp: OpportunityItem) => {
    setActiveOpportunity(null);
    if (opp.targetTab === 'inventory') {
      router.push('/(tabs)/inventory');
    } else if (opp.targetTab === 'billing') {
      router.push('/(tabs)/billing');
    }
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="Overview"
        subtitle="Good morning, Merchant — Here's what needs your attention today."
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        actionLabel="+ New Bill"
        onAction={() => router.push('/(tabs)/billing')}
        secondaryLabel="AI Scan"
        onSecondaryAction={() => router.push('/(tabs)/opportunities')}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Top 4 Compact KPIs */}
        <View style={styles.kpiRow}>
          <KpiCard
            label={mockDashboardKpis.todaySales.label}
            value={mockDashboardKpis.todaySales.value}
            delta={mockDashboardKpis.todaySales.delta}
            isPositive={mockDashboardKpis.todaySales.isPositive}
            subtext={mockDashboardKpis.todaySales.subtext}
            accent={colors.primary}
          />
          <KpiCard
            label={mockDashboardKpis.grossProfit.label}
            value={mockDashboardKpis.grossProfit.value}
            delta={mockDashboardKpis.grossProfit.delta}
            isPositive={mockDashboardKpis.grossProfit.isPositive}
            subtext={mockDashboardKpis.grossProfit.subtext}
            accent={colors.opportunity}
          />
          <KpiCard
            label={mockDashboardKpis.inventoryValue.label}
            value={mockDashboardKpis.inventoryValue.value}
            delta={mockDashboardKpis.inventoryValue.delta}
            isPositive={mockDashboardKpis.inventoryValue.isPositive}
            subtext={mockDashboardKpis.inventoryValue.subtext}
            accent={colors.attention}
          />
          <KpiCard
            label={mockDashboardKpis.cashReceivables.label}
            value={mockDashboardKpis.cashReceivables.value}
            delta={mockDashboardKpis.cashReceivables.delta}
            isPositive={mockDashboardKpis.cashReceivables.isPositive}
            subtext={mockDashboardKpis.cashReceivables.subtext}
            accent="#6366F1"
          />
        </View>

        {/* Main Grid: Chart & Priority Opportunities */}
        <View style={styles.mainGrid}>
          {/* Left Column: Sales Chart & Recent Transactions */}
          <View style={styles.leftCol}>
            {/* Sales Chart Panel */}
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View>
                  <Text style={styles.panelTitle}>Sales Velocity & Gross Margin</Text>
                  <Text style={styles.panelSub}>
                    Comparing trailing 7-day revenue against previous period run rate
                  </Text>
                </View>
                <View style={styles.chartLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                    <Text style={styles.legendText}>Current Period</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendLineDash]} />
                    <Text style={styles.legendText}>Prior 7 Days</Text>
                  </View>
                </View>
              </View>

              <SalesVelocityChart
                data={mockSalesPerformance}
                width={Math.min(width * 0.55, 620)}
                height={210}
              />
            </View>

            {/* Live Transaction Ledger */}
            <View style={[styles.panel, { marginTop: 16 }]}>
              <View style={styles.panelHeader}>
                <View>
                  <Text style={styles.panelTitle}>Recent Store Transactions</Text>
                  <Text style={styles.panelSub}>Live point-of-sale checkout telemetry</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/(tabs)/sales')}>
                  <Text style={styles.linkText}>View full ledger →</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.txTable}>
                {bills.slice(0, 4).map(b => (
                  <View key={b.id} style={styles.txRow}>
                    <View style={styles.txAvatar}>
                      <Text style={styles.txAvatarText}>
                        {(b.customer_name || 'W')[0].toUpperCase()}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.txName}>
                        {b.customer_name || 'Walk-in Customer'}
                      </Text>
                      <Text style={styles.txMeta}>
                        Invoice #{b.id} · {b.payment_method || 'UPI'}
                      </Text>
                    </View>
                    <Text style={styles.txAmount}>
                      +₹{(b.total_amount || 0).toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Right Column: AI Opportunity Engine Highlight */}
          <View style={styles.rightCol}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>
                <View>
                  <View style={styles.engineBadgeRow}>
                    <Text style={styles.panelTitle}>AI Opportunity Engine</Text>
                    <View style={styles.enginePill}>
                      <Text style={styles.enginePillText}>2 High Priority</Text>
                    </View>
                  </View>
                  <Text style={styles.panelSub}>
                    Actions that could protect or grow your business today
                  </Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/(tabs)/opportunities')}>
                  <Text style={styles.linkText}>All (5) →</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: 12 }}>
                {mockOpportunities.slice(0, 3).map(opp => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    onPress={o => setActiveOpportunity(o)}
                    onActionPress={o => handleTakeAction(o)}
                  />
                ))}
              </View>
            </View>

            {/* Store Health Snapshot */}
            <View style={[styles.panel, { marginTop: 16 }]}>
              <Text style={styles.panelTitle}>Operating Health Summary</Text>
              <View style={styles.healthGrid}>
                <View style={styles.healthItem}>
                  <Text style={styles.healthNum}>148</Text>
                  <Text style={styles.healthLabel}>Catalog SKUs</Text>
                </View>
                <View style={styles.healthItem}>
                  <Text style={[styles.healthNum, { color: '#B91C1C' }]}>4</Text>
                  <Text style={styles.healthLabel}>Low Stock Items</Text>
                </View>
                <View style={styles.healthItem}>
                  <Text style={[styles.healthNum, { color: '#B45309' }]}>2</Text>
                  <Text style={styles.healthLabel}>Expiring in 7D</Text>
                </View>
                <View style={styles.healthItem}>
                  <Text style={[styles.healthNum, { color: '#047857' }]}>99.2%</Text>
                  <Text style={styles.healthLabel}>POS Uptime</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Opportunity Detail Drawer */}
      <OpportunityDetail
        opportunity={activeOpportunity}
        visible={!!activeOpportunity}
        onClose={() => setActiveOpportunity(null)}
        onTakeAction={handleTakeAction}
        onDismiss={id => {
          setActiveOpportunity(null);
        }}
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
  kpiRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  mainGrid: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  leftCol: {
    flex: 1.4,
    minWidth: 340,
  },
  rightCol: {
    flex: 1.1,
    minWidth: 320,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    ...shadows.sm,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  panelSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  linkText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2563EB',
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLineDash: {
    width: 14,
    height: 2,
    backgroundColor: '#94A3B8',
  },
  legendText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  txTable: {
    marginTop: 4,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  txAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  txAvatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1D4ED8',
  },
  txName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  txMeta: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  engineBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  enginePill: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
  },
  enginePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#B91C1C',
    letterSpacing: 0.5,
  },
  healthGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  healthItem: {
    alignItems: 'center',
  },
  healthNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  healthLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
});