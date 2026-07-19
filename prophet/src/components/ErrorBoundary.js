import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log('ErrorBoundary caught:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={s.container}>
          <Text style={s.title}>কিছু সমস্যা হয়েছে</Text>
          <Text style={s.sub}>অ্যাপটি পুনরায় চালু করুন</Text>
          <TouchableOpacity
            style={s.btn}
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={s.btnText}>আবার চেষ্টা করুন</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 24 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  sub: { fontSize: 14, color: '#64748B', marginBottom: 20, textAlign: 'center' },
  btn: { backgroundColor: '#6366F1', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
