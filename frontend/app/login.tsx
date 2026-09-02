import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Dimensions, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, radius, shadows, brand } from '../constants/theme';
import ProfitExeLogo from '../components/ProfitExeLogo';

const { width } = Dimensions.get('window');

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('owner@srikrishna.profit.exe.in');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please provide valid merchant credentials.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)');
    }, 600);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Logo & Header */}
          <View style={styles.logoWrap}>
            <ProfitExeLogo variant="stacked" size="lg" showDescriptor />
            <Text style={styles.tagline}>“{brand.tagline}”</Text>
          </View>

          {/* Active Workspace Pill */}
          <View style={styles.workspacePill}>
            <Text style={styles.workspaceLabel}>Store Workspace</Text>
            <Text style={styles.workspaceName}>{brand.merchantName}</Text>
            <Text style={styles.workspaceMeta}>{brand.merchantLocation} · GST: {brand.merchantGST}</Text>
          </View>

          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Input Fields */}
          <View style={styles.inputWrap}>
            <Text style={styles.inputLabel}>Merchant ID / Email</Text>
            <TextInput
              style={styles.input}
              placeholder="owner@store.profit.exe.in"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrap}>
            <View style={styles.passwordRow}>
              <Text style={styles.inputLabel}>Security PIN / Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgotLink}>Reset PIN</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="••••••••••••"
              placeholderTextColor="#94A3B8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.primaryBtnText}>Launch Intelligence Console →</Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with biometric SSO</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.ssoRow}>
            {['Google Workspace', 'Aadhaar / DigiLocker'].map((prov, i) => (
              <TouchableOpacity
                key={i}
                style={styles.ssoBtn}
                onPress={handleLogin}
                activeOpacity={0.7}
              >
                <Text style={styles.ssoBtnText}>{prov}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footerNote}>
            <Text style={styles.demoHint}>
              Sandbox Terminal: Any credentials will launch live merchant console
            </Text>
            <Text style={styles.footerMeta}>
              profit.exe OS v{brand.version} · End-to-End Encrypted POS Tunnel
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadows.elevated,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 12.5,
    fontStyle: 'italic',
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  workspacePill: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  workspaceLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  workspaceName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  workspaceMeta: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 6,
    padding: 10,
    marginBottom: 14,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputWrap: {
    marginBottom: 16,
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  forgotLink: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13.5,
    color: '#0F172A',
  },
  primaryBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    ...shadows.sm,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  ssoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  ssoBtn: {
    flex: 1,
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  ssoBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#475569',
  },
  footerNote: {
    marginTop: 24,
    alignItems: 'center',
    gap: 4,
  },
  demoHint: {
    fontSize: 10.5,
    color: '#64748B',
    textAlign: 'center',
  },
  footerMeta: {
    fontSize: 9.5,
    color: '#94A3B8',
    marginTop: 4,
  },
});
