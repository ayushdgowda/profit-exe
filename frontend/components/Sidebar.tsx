import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { colors, radius, brand } from '../constants/theme';
import ProfitExeLogo from './ProfitExeLogo';
import {
  IconOverview,
  IconOpportunities,
  IconSales,
  IconInventory,
  IconBilling,
  IconCustomers,
  IconAnalytics,
  IconAssistant,
  IconSettings,
} from './Icons';

interface NavItem {
  id: string;
  label: string;
  path: string;
  renderIcon: (color: string) => React.ReactNode;
  badge?: string;
  badgeVariant?: 'opportunity' | 'danger' | 'neutral';
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    path: '/(tabs)',
    renderIcon: (color) => <IconOverview size={17} color={color} />,
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    path: '/(tabs)/opportunities',
    renderIcon: (color) => <IconOpportunities size={17} color={color} />,
    badge: '5',
    badgeVariant: 'opportunity',
  },
  {
    id: 'sales',
    label: 'Sales & Orders',
    path: '/(tabs)/sales',
    renderIcon: (color) => <IconSales size={17} color={color} />,
  },
  {
    id: 'inventory',
    label: 'Inventory Intelligence',
    path: '/(tabs)/inventory',
    renderIcon: (color) => <IconInventory size={17} color={color} />,
    badge: '4',
    badgeVariant: 'danger',
  },
  {
    id: 'billing',
    label: 'Billing & POS',
    path: '/(tabs)/billing',
    renderIcon: (color) => <IconBilling size={17} color={color} />,
  },
  {
    id: 'customers',
    label: 'Customers',
    path: '/(tabs)/customers',
    renderIcon: (color) => <IconCustomers size={17} color={color} />,
  },
  {
    id: 'analytics',
    label: 'Growth Analytics',
    path: '/(tabs)/analytics',
    renderIcon: (color) => <IconAnalytics size={17} color={color} />,
  },
  {
    id: 'assistant',
    label: 'AI Assistant',
    path: '/(tabs)/chatbot',
    renderIcon: (color) => <IconAssistant size={17} color={color} />,
  },
];

interface SidebarProps {
  currentTab?: string;
  onNavigate?: (path: string) => void;
}

export default function Sidebar({ currentTab, onNavigate }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (item: NavItem) => {
    if (onNavigate) {
      onNavigate(item.path);
    } else {
      router.push(item.path as any);
    }
  };

  const isActive = (item: NavItem) => {
    if (currentTab) return currentTab === item.id;
    if (item.path === '/(tabs)' && (pathname === '/(tabs)' || pathname === '/')) return true;
    return pathname.includes(item.id);
  };

  return (
    <View style={styles.sidebar}>
      {/* Brand Header */}
      <View style={styles.brandRow}>
        <ProfitExeLogo variant="horizontal" size="md" />
      </View>

      {/* Workspace Context Box */}
      <View style={styles.workspaceBox}>
        <View style={styles.storeAvatar}>
          <Text style={styles.storeAvatarText}>SK</Text>
        </View>
        <View style={styles.storeInfo}>
          <Text style={styles.storeName} numberOfLines={1}>
            {brand.merchantName}
          </Text>
          <Text style={styles.storeMeta}>{brand.merchantLocation}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Navigation Links */}
      <ScrollView style={styles.navSection} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionLabel}>Navigation</Text>

        {NAV_ITEMS.map(item => {
          const active = isActive(item);
          const iconColor = active ? '#0F172A' : '#64748B';

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.navBtn, active && styles.navBtnActive]}
              onPress={() => handleNav(item)}
              activeOpacity={0.7}
            >
              <View style={styles.navLeft}>
                <View style={styles.iconContainer}>
                  {item.renderIcon(iconColor)}
                </View>
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </View>

              {item.badge && (
                <View
                  style={[
                    styles.navBadge,
                    item.badgeVariant === 'opportunity' && styles.badgeOpportunity,
                    item.badgeVariant === 'danger' && styles.badgeDanger,
                  ]}
                >
                  <Text
                    style={[
                      styles.badgeText,
                      item.badgeVariant === 'opportunity' && styles.badgeTextOpp,
                      item.badgeVariant === 'danger' && styles.badgeTextDang,
                    ]}
                  >
                    {item.badge}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer / System Status */}
      <View style={styles.footerSection}>
        <View style={styles.syncStatus}>
          <View style={styles.syncDot} />
          <Text style={styles.syncText}>POS Engine Online · Synced</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => handleNav(NAV_ITEMS[0])}
        >
          <IconSettings size={15} color="#64748B" />
          <Text style={styles.settingsText}>Settings & Hardware</Text>
        </TouchableOpacity>

        <View style={styles.merchantCard}>
          <View style={styles.merchantAvatar}>
            <Text style={styles.merchantInitial}>M</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.merchantUser}>Kushagra (Owner)</Text>
            <Text style={styles.merchantRole}>Terminal 01 · Full Access</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  brandRow: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
  },
  workspaceBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 14,
    padding: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  storeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeAvatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  storeMeta: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  navSection: {
    flex: 1,
    paddingHorizontal: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: radius.sm,
    marginBottom: 2,
  },
  navBtnActive: {
    backgroundColor: '#F1F5F9',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569',
  },
  navLabelActive: {
    color: '#0F172A',
    fontWeight: '600',
  },
  navBadge: {
    backgroundColor: '#F1F5F9',
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
  },
  badgeOpportunity: {
    backgroundColor: '#ECFDF5',
  },
  badgeDanger: {
    backgroundColor: '#FEF2F2',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  badgeTextOpp: {
    color: '#047857',
  },
  badgeTextDang: {
    color: '#B91C1C',
  },
  footerSection: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
    gap: 10,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  syncDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  syncText: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#64748B',
  },
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  settingsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  merchantCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
  },
  merchantAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantInitial: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  merchantUser: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  merchantRole: {
    fontSize: 9.5,
    color: '#64748B',
  },
});
