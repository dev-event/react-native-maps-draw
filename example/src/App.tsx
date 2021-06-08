import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import Map from 'react-native-maps-draw';

export default function App() {
  return (
    <View style={styles.container}>
      <Map style={{ flex: 1 }} />
      <Text>3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
