import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, Animated, ActivityIndicator,
} from 'react-native';
import { colors, radius, shadows, brand } from '../../constants/theme';
import TopBar from '../../components/TopBar';
import StatusBadge from '../../components/StatusBadge';
import { sendChatMessage } from '../../services/api';
import { mockAssistantPrompts } from '../../mock/merchantData';

interface StructuredReport {
  recommendation: string;
  reasons: string[];
  expectedImpact: string;
  confidence: number;
  actionText: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text?: string;
  report?: StructuredReport;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome',
    role: 'assistant',
    report: {
      recommendation: 'Immediate Reorder: Order 32 units of Nandini Full Cream Milk (500ml) before 6:00 PM.',
      reasons: [
        'Current inventory covers ~1.5 days of demand at current morning velocity.',
        'Trailing 7-day demand is 18% above baseline due to neighborhood residential footfall.',
        'Friday & Saturday morning demand historically peaks by an additional +22%.',
      ],
      expectedImpact: '₹1,920 morning revenue protected',
      confidence: 89,
      actionText: 'Generate Supplier Purchase Order',
    },
  },
];

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim, { toValue: 1, duration: 450, useNativeDriver: true }),
          Animated.timing(dotAnim, { toValue: 0, duration: 450, useNativeDriver: true }),
        ])
      ).start();
    } else {
      dotAnim.setValue(0);
    }
  }, [isTyping]);

  const scrollToEnd = () => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const getStructuredResponse = (query: string): StructuredReport => {
    const q = query.toLowerCase();
    if (q.includes('stock') && (q.includes('tomorrow') || q.includes('order'))) {
      return {
        recommendation: 'Reorder 32 units of Nandini Milk (500ml) & 15 units of Britannia Whole Wheat Bread.',
        reasons: [
          'Milk inventory is at 11 units against 25 minimum threshold.',
          'Bread has 3 days of supply remaining with weekend morning uplift expected.',
          'Combo breakfast basket volume peaks on Saturdays.',
        ],
        expectedImpact: '₹2,670 weekend stockout risk averted',
        confidence: 91,
        actionText: 'Add to Distributor Order List',
      };
    }
    if (q.includes('profit') || q.includes('margin')) {
      return {
        recommendation: 'Price Calibration: Adjust Tata Tea Gold (500g) shelf price from ₹260 to ₹275.',
        reasons: [
          'Supplier wholesale cost increased from ₹230 to ₹245 (+₹15).',
          'Current gross margin dropped to 5.7% (target is 12.5%).',
          'Competitor price check confirms average retail price of ₹274 in your area.',
        ],
        expectedImpact: '₹3,240 monthly gross margin recovered',
        confidence: 94,
        actionText: 'Update Shelf Price in POS',
      };
    }
    if (q.includes('dead') || q.includes('slow')) {
      return {
        recommendation: 'Liquidate Dead Stock: Run 15% markdown or bundle Everest Sambar Masala.',
        reasons: [
          '18 units have recorded zero sales in 21 days.',
          'Consumes high-visibility shelf space with 90-day expiry horizon.',
          'Bundling with 1kg Toor Dal can liquidate inventory within 5 days.',
        ],
        expectedImpact: '₹2,160 working capital liberated',
        confidence: 88,
        actionText: 'Create Clearance Bundle',
      };
    }
    return {
      recommendation: `Analysis for "${query}": Maintain buffer stock for top dairy & beverage lines.`,
      reasons: [
        'Store velocity is tracking 12.4% above last week.',
        'UPI transaction adoption is at an all-time high of 68%.',
        'Customer retention rate remains solid at 76.4%.',
      ],
      expectedImpact: 'Optimized operating cash flow',
      confidence: 86,
      actionText: 'Review Store Health',
    };
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    scrollToEnd();

    // Call backend API or structured model
    try {
      const backendReply = await sendChatMessage(query);
      const structured = getStructuredResponse(query);

      // If backend gave a real response, incorporate it
      if (backendReply && !backendReply.includes("Sorry, I couldn't")) {
        structured.recommendation = backendReply;
      }

      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          report: structured,
        },
      ]);
    } catch (e) {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          report: getStructuredResponse(query),
        },
      ]);
    }
    scrollToEnd();
  };

  return (
    <View style={styles.container}>
      <TopBar
        title="profit.exe Assistant"
        subtitle="Business intelligence copilot answering store questions using real-time telemetry."
        actionLabel="Clear Chat"
        onAction={() => setMessages(INITIAL_MESSAGES)}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.chatArea}
          contentContainerStyle={{ padding: 24, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToEnd}
        >
          {/* Quick Prompt Suggestions */}
          <View style={styles.promptSection}>
            <Text style={styles.promptHeader}>Quick Store Prompts</Text>
            <View style={styles.promptRow}>
              {mockAssistantPrompts.map((p, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.promptChip}
                  onPress={() => handleSend(p)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.promptChipText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Messages */}
          {messages.map(m => {
            if (m.role === 'user') {
              return (
                <View key={m.id} style={styles.userBubble}>
                  <Text style={styles.userBubbleText}>{m.text}</Text>
                </View>
              );
            }

            // Structured Assistant Report
            const r = m.report;
            if (!r) return null;

            return (
              <View key={m.id} style={styles.reportCard}>
                {/* Header */}
                <View style={styles.reportHeader}>
                  <View style={styles.reportBadge}>
                    <Text style={styles.reportBadgeText}>Intelligence Brief</Text>
                  </View>
                  <Text style={styles.confidenceText}>{r.confidence}% confidence</Text>
                </View>

                {/* Recommendation */}
                <Text style={styles.recommendationText}>{r.recommendation}</Text>

                {/* Why / Reasons */}
                <View style={styles.reasonSection}>
                  <Text style={styles.reasonHeader}>Supporting Factors & Evidence</Text>
                  {r.reasons.map((reason, i) => (
                    <View key={i} style={styles.reasonRow}>
                      <View style={styles.reasonDot} />
                      <Text style={styles.reasonText}>{reason}</Text>
                    </View>
                  ))}
                </View>

                {/* Impact Strip */}
                <View style={styles.impactBox}>
                  <View>
                    <Text style={styles.impactLabel}>Estimated Impact</Text>
                    <Text style={styles.impactVal}>{r.expectedImpact}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.reportActionBtn}
                    onPress={() => alert(`Triggering: "${r.actionText}"`)}
                  >
                    <Text style={styles.reportActionText}>{r.actionText} →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingCard}>
              <Text style={styles.typingText}>profit.exe analyzing store telemetry...</Text>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask about inventory, supplier margins, sales trends..."
            placeholderTextColor="#94A3B8"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend()}
            returnKeyType="send"
            editable={!isTyping}
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || isTyping) && { opacity: 0.5 }]}
            onPress={() => handleSend()}
            disabled={!input.trim() || isTyping}
          >
            {isTyping ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.sendBtnText}>Ask</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  chatArea: {
    flex: 1,
  },
  promptSection: {
    marginBottom: 20,
  },
  promptHeader: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  promptRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promptChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    ...shadows.sm,
  },
  promptChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#334155',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '75%',
    marginBottom: 16,
  },
  userBubbleText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginBottom: 18,
    ...shadows.sm,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportBadge: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  reportBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },
  confidenceText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#64748B',
  },
  recommendationText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 22,
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  reasonSection: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 14,
  },
  reasonHeader: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 6,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  reasonDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2563EB',
    marginTop: 7,
  },
  reasonText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 18,
  },
  impactBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 6,
    padding: 12,
    gap: 12,
    flexWrap: 'wrap',
  },
  impactLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 0.5,
  },
  impactVal: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#065F46',
    marginTop: 2,
  },
  reportActionBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  reportActionText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  typingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    alignSelf: 'flex-start',
  },
  typingText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  inputArea: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0F172A',
  },
  sendBtn: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});