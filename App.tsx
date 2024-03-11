import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, View, ScrollView } from 'react-native';
import { Routes } from './src/routes';
import { BuscarPartidasPorId } from './src/screens/BuscarPartidasPorId';

export default function App() {
  return (
    <View style={styles.container}>
      <Routes />
      <StatusBar
        backgroundColor={"#000"}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
