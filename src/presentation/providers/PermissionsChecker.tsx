import React, { Children, PropsWithChildren, useEffect } from 'react'
import { AppState, Text, View } from 'react-native'
import { usePermissionStore } from '../store/permissions/usePermissionStore'
import { checkLocationPermission } from '../../actions/permissions/location';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        setTimeout(() => {
            
            if( locationStatus === 'granted'){
              navigation.reset({
                  routes: [{ name: 'LoginScreen'}]
              });
      
      
            } else if (locationStatus === 'undetermined'){
              navigation.reset({
                  routes: [{ name: 'PermissionsScreen'}]
              });
            }
        }, 1000);
    
    }, [locationStatus])

    useEffect(() => {
        checkLocationPermission();
    }, []);
    
    
    useEffect(() => {
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if( nextAppState === 'active' ){
            checkLocationPermission();
        }
    });
    
      return () => {
        subscription.remove();
      }
    }, [])
    

  return (
    <>{ children }</>
  )
}
