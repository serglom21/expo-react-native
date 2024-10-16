import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigationContainerRef } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import * as Sentry from '@sentry/react-native';
import { ThemedText } from '@/components/ThemedText';

const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
})

Sentry.init({
  dsn: '{SENTRY_DSN}',
  tracesSampleRate: 1.0,
  debug: true,
  integrations: [
    Sentry.reactNativeTracingIntegration({
      routingInstrumentation,
    })
  ]
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const ref = useNavigationContainerRef();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  return (
    <NavigationContainer
      ref={ref}
      independent={true}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(ref)
      }}
    >
       <Stack initialRouteName="Home">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
       </Stack> 
    </NavigationContainer>


  );
}

export default Sentry.wrap(RootLayout)