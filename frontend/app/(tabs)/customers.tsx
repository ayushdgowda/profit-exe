import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Dimensions,
} from 'react-native';
import { colors, radius, shadows } from '../../constants/theme';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { mockCustomers } from '../../mock/merchantData';

export default function CustomersScreen() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState(mockCustomers);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <View style={styles.container}>
      <TopBar
        title="Customer Directory"
        subtitle="Repeat footfall telemetry, lifetime store spend, and loyalty profiles."
        actionLabel="+ Add Customer"
        onAction={() => alert('Customer registration modal')}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Customer Metrics */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Active Regular Patrons</Text>
            <Text style={styles.kpiValue}>142</Text>
            <Text style={styles.kpiSub}>Purchased in last 30 days</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Repeat Retention Rate</Text>
            <Text style={[styles.kpiValue, { color: '#047857' }]}>76.4%</Text>
            <Text style={styles.kpiSub}>Visit frequency ≥ 3x / week</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Top Spender (30D)</Text>
            <Text style={styles.kpiValue}>Rajesh Sharma</Text>
            <Text style={styles.kpiSub}>₹24,800 across 28 visits</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by customer name or phone number..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Customer Table */}
        <View style={styles.tableCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, { flex: 1.8 }]}>Customer</Text>
            <Text style={[styles.th, { flex: 1.4 }]}>Phone</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>Visits</Text>
            <Text style={[styles.th, { flex: 1.2, textAlign: 'right' }]}>Total Spend</Text>
            <Text style={[styles.th, { flex: 1.1, textAlign: 'right' }]}>Avg Basket</Text>
            <Text style={[styles.th, { flex: 1.1, textAlign: 'center' }]}>Tender</Text>
            <Text style={[styles.th, { flex: 1.4, textAlign: 'right' }]}>Segment</Text>
          </View>

          {filtered.map(cust => (
            <View key={cust.id} style={styles.tableRow}>
              <View style={{ flex: 1.8 }}>
                <Text style={styles.tdBold}>{cust.name}</Text>
                <Text style={styles.tdSub}>Last seen {cust.lastVisit}</Text>
              </View>
              <Text style={[styles.td, { flex: 1.4 }]}>{cust.phone}</Text>
              <Text style={[styles.tdBold, { flex: 1, textAlign: 'center' }]}>
                {cust.visits}
              </Text>
              <Text style={[styles.tdAmount, { flex: 1.2, textAlign: 'right' }]}>
                ₹{cust.totalSpend.toLocaleString('en-IN')}
              </Text>
              <Text style={[styles.td, { flex: 1.1, textAlign: 'right' }]}>
                ₹{cust.avgBasket}
              </Text>
              <Text style={[styles.td, { flex: 1.1, textAlign: 'center' }]}>
                {cust.preferredPayment}
              </Text>
              <View style={{ flex: 1.4, alignItems: 'flex-end' }}>
                <StatusBadge
                  label={cust.status}
                  variant={
                    cust.status === 'VIP Regular'
                      ? 'success'
                      : cust.status === 'High Spender'
                      ? 'info'
                      : 'neutral'
                  }
                  size="sm"
                />
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  kpiCard: {
    flex: 1,
    minWidth: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    ...shadows.sm,
  },
  kpiLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 6,
  },
  kpiValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  kpiSub: {
    fontSize: 11,
    color: '#64748B',
  },
  searchBar: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...shadows.sm,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  th: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  td: {
    fontSize: 12.5,
    color: '#334155',
  },
  tdBold: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  tdSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
  },
  tdAmount: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
});
