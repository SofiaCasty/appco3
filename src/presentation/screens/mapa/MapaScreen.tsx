import { useAuthStore } from "../../store/auth/useAuthStore";
import { MainLayout } from "../../layouts/MainLayout";
import Logo from '../../../assets/LogoCSG2.png'; 
import { Layout } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { Map } from "../../components/maps/Map";
import { getCurrentLocation } from "../../../actions/location/location";
import { useEffect, useRef } from "react";
import { useLocationStore } from "../../store/location/useLocationStore";
import { LoadingScreen } from '../loading/LoadingScreen'
import { FAB } from "../../components/ui/FAB";
import MapView from "react-native-maps";
//import MapView from "react-native-maps";



export const MapaScreen = () => {
    const { logout, user } = useAuthStore();  // Suponiendo que 'user' tiene la información del usuario
    const { lastKnowLocation, getLocation } = useLocationStore();

    useEffect(() => {
      if ( lastKnowLocation === null ){
        getLocation();
      }
    },[])


    if( lastKnowLocation  === null ){
      return (<LoadingScreen />)
    }

    

  return (
    <>
    <MainLayout
      title="CO3"
      subTitle={user?.name}
      rightAction={() => {}}
      rightActionIcon="plus-outline"
      logo={Logo}
    >
      <View style={styles.container}>
        {/* <Map /> */}
        <Map 
          initialLocation={ lastKnowLocation }
        />
      </View>
    </MainLayout>

    
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '65%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
 });