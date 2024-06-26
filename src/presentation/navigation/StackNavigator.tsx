import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { QuoteScreen } from '../screens/quote/QuoteScreen';
import { MapaScreen } from '../screens/mapa/MapaScreen';
import { PermissionsScreen } from '../screens/permissions/PermissionsScreen';

export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
    QuoteScreen: undefined;
    MapaScreen: undefined;
    PermissionsScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress,
        }
    }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
    initialRouteName='LoadingScreen'
    screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="MapaScreen" component={MapaScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="PermissionsScreen" component={PermissionsScreen} />

      <Stack.Screen name="QuoteScreen" component={QuoteScreen} />
    </Stack.Navigator>
  );
}