import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks } from '../storage/taskStorage';
import { colors, radii } from '../theme/tokens';

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

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <View style={styles.container}>
      {total === 0 ? (
        <Text style={styles.emptyText}>Nenhuma tarefa cadastrada ainda.</Text>
      ) : (
        <>
          <Text style={styles.percentageValue}>{percentage}%</Text>
          <Text style={styles.percentageLabel}>Concluído</Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.subLabel}>
            {completed} de {total} tarefas concluídas
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{pending}</Text>
              <Text style={styles.statLabel}>Pendentes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 24, justifyContent: 'center' },
  percentageValue: { fontSize: 56, fontWeight: '700', color: colors.red, textAlign: 'center' },
  percentageLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    textAlign: 'center',
    marginBottom: 24,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: colors.red },
  subLabel: { fontSize: 14, color: colors.inkMuted, textAlign: 'center', marginBottom: 32 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: 20,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: colors.ink },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.inkMuted,
    marginTop: 4,
  },
  statDivider: { width: 1, backgroundColor: colors.border },
  emptyText: { textAlign: 'center', color: colors.inkMuted, fontSize: 15 },
});