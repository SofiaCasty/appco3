
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { PermissionsChecker } from './presentation/providers/PermissionsChecker';


export const co3App = () => {

  const colorScheme = useColorScheme();
  const theme = eva.light;
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer>
          <PermissionsChecker>
            <AuthProvider>
              <StackNavigator />
            </AuthProvider>
          </PermissionsChecker>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
