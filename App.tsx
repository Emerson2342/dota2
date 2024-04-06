import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Routes } from './src/routes';
import { PlayerProvider } from './src/components/Context/useDatasContex';

export default function App() {
  return (
    <View style={styles.container}>
      <PlayerProvider>
        <Routes />
        <StatusBar
          backgroundColor={"#000"}
        />
      </PlayerProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
