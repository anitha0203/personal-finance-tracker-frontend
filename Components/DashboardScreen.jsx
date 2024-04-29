import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';

export default function DashboardScreen() {

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.mainHeading}>Dashboard</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
