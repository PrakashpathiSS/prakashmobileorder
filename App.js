import { BlurView } from '@react-native-community/blur';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Provider from "./src/redux/provider/Provider";
import { OfflineLoad } from "./src/components/offline-load";
import { useState } from 'react';
import { RootNavigator } from "./src/navigation/root-navigator";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
 const [loading, setLoading] = useState(true);
  return (
    <View style={styles.center}>
      <Provider>
        <StatusBar
          barStyle={"dark-content"}
          translucent={true}
          backgroundColor={'#FFFFFF'}
        />
        {loading ? (
          <OfflineLoad loading={loading} setLoading={setLoading} />
        ) : (
          <SafeAreaView
            style={{
              flex: 1,
              paddingTop: Platform.OS == "ios" ? "11%" : 0,
              paddingBottom: Platform.OS == "ios" ? 0 : 0,
            }}
          >
            <RootNavigator
            />
          </SafeAreaView>
        )}
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
  },
});
