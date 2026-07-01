import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks } from '../storage/taskStorage';

export default function SummaryScreen() {
  const [total, setTotal] = useState(0);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  const loadSummary = useCallback(async () => {
    const tasks = await getTasks();
    setTotal(tasks.length);
    setCompleted(tasks.filter((task) => task.completed).length);
    setPending(tasks.filter((task) => !task.completed).length);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSummary();
    }, [loadSummary])
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardValue}>{total}</Text>
        <Text style={styles.cardLabel}>Total</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardValue}>{pending}</Text>
        <Text style={styles.cardLabel}>Pendentes</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardValue}>{completed}</Text>
        <Text style={styles.cardLabel}>Concluídas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    flexBasis: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardValue: { fontSize: 32, fontWeight: '700', color: '#2563eb' },
  cardLabel: { fontSize: 14, color: '#6b7280', marginTop: 4 },
});
