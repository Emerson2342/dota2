import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Routes } from './src/routes';
import { PlayerProvider } from './src/context/useDatasContex';
import { KeyCounterProvider } from './src/context/useKeyCounter';

export default function App() {
  return (
    <View style={styles.container}>
      <KeyCounterProvider>
        <PlayerProvider>
          <Routes />
          <StatusBar
            backgroundColor={"transparent"}
            translucent={true}

          />
        </PlayerProvider>
      </KeyCounterProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
