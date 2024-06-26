import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { globalStyles } from '../../../config/theme/styles'
import { usePermissionStore } from '../../store/permissions/usePermissionStore'
import { MainLayout } from '../../layouts/MainLayout'
import { useAuthStore } from '../../store/auth/useAuthStore'
import Logo from '../../../assets/LogoCSG2.png';  // Asegúrate de que la ruta sea correcta


export const PermissionsScreen = () => {

  const { locationStatus, requestLocationPermission } = usePermissionStore();
  const { logout, user } = useAuthStore();  // Suponiendo que 'user' tiene la información del usuario


  return (
    <MainLayout
      title="CO3"
      subTitle={user?.name} 
      rightAction={() => {}}
      rightActionIcon="plus-outline"
      logo={Logo}
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ color: 'black' }}>Habilitar ubicacion</Text>

            <Pressable 
            style={ globalStyles.btnPrimary }
            onPress={ requestLocationPermission }
            >
            <Text style={{ color: 'white' }}>Habilitar Localizacion</Text>
            </Pressable>

            <Text style={{ color: 'black' }}>Estado actual: { locationStatus }</Text>
        </View>
    </MainLayout>
  )
}
