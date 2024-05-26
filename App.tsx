import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { StyleSheet, StatusBar, View } from 'react-native';
import { Routes } from './src/routes';
import { PlayerProvider } from './src/context/useDatasContex';
import { KeyCounterProvider } from './src/context/useKeyCounter';
import { FriendsListProvider } from './src/context/useFriendsListContext';

export default function App() {
  return (
    <View style={styles.container}>
      <KeyCounterProvider>
        <PlayerProvider>
          <FriendsListProvider>
            <Routes />
            <StatusBar
              backgroundColor={"transparent"}
              translucent={true}
            />
          </FriendsListProvider>
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
