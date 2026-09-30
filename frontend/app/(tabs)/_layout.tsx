import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import Sidebar from '../../components/Sidebar';
import { colors } from '../../constants/theme';
import {
  IconOverview,
  IconOpportunities,
  IconSales,
  IconInventory,
  IconBilling,
  IconCustomers,
  IconAnalytics,
  IconAssistant,
} from '../../components/Icons';

export default function TabLayout() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });
    return () => sub?.remove();
  }, []);

  const isDesktop = dimensions.width >= 768;

  return (
    <View style={styles.shell}>
      {/* Desktop Sidebar */}
      {isDesktop && <Sidebar />}

      {/* Main Outlet */}
      <View style={styles.mainContainer}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: isDesktop ? { display: 'none' } : styles.mobileTabBar,
            tabBarActiveTintColor: colors.dark,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: { fontSize: 10, fontWeight: '600', marginTop: 2 },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Overview',
              tabBarLabel: 'Overview',
              tabBarIcon: ({ color }) => <IconOverview size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="opportunities"
            options={{
              title: 'Opportunities',
              tabBarLabel: 'Opportunities',
              tabBarIcon: ({ color }) => <IconOpportunities size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="sales"
            options={{
              title: 'Sales',
              tabBarLabel: 'Sales',
              tabBarIcon: ({ color }) => <IconSales size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="inventory"
            options={{
              title: 'Inventory',
              tabBarLabel: 'Inventory',
              tabBarIcon: ({ color }) => <IconInventory size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="billing"
            options={{
              title: 'Billing',
              tabBarLabel: 'Billing',
              tabBarIcon: ({ color }) => <IconBilling size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="customers"
            options={{
              title: 'Customers',
              tabBarLabel: 'Customers',
              tabBarIcon: ({ color }) => <IconCustomers size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="analytics"
            options={{
              title: 'Analytics',
              tabBarLabel: 'Analytics',
              tabBarIcon: ({ color }) => <IconAnalytics size={17} color={color} />,
            }}
          />
          <Tabs.Screen
            name="chatbot"
            options={{
              title: 'AI Assistant',
              tabBarLabel: 'Assistant',
              tabBarIcon: ({ color }) => <IconAssistant size={17} color={color} />,
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    height: '100%',
    overflow: 'hidden',
  },
  mobileTabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    height: 60,
    paddingBottom: 6,
    paddingTop: 6,
  },
});