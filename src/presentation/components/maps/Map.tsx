import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Location } from "../../../infrastructure/interfaces/location";
import { FAB } from "../ui/FAB";
import { useEffect, useRef, useState } from "react";
import { useLocationStore } from "../../store/location/useLocationStore";

interface Props {
    showsUserLocation?: boolean;
    initialLocation: Location;
}
export const Map = ({ showsUserLocation = true, initialLocation }: Props ) => {

    const mapRef = useRef<MapView>();
    const cameraLocation = useRef<Location>(initialLocation);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);


    const { getLocation, lastKnownLocation, watchLocation, clearWatchLocation, userLocationList } = useLocationStore();

    const moveCameraToLocation = (location: Location) => {
        if (!mapRef.current) return;
        mapRef.current.animateCamera({center: location});
    };

    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
          moveCameraToLocation(initialLocation);
        } 
        const location = await getLocation();
        if (!location) return;
        moveCameraToLocation(location);
    };

    useEffect(() => {
        watchLocation();
    
        return () => {
          clearWatchLocation();
        };
    }, []);
    
    useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
        moveCameraToLocation(lastKnownLocation);
    }
    }, [lastKnownLocation, isFollowingUser]);
    
    return (
    <>
        <MapView
        ref={(map) => mapRef.current = map! }
        showsUserLocation = { showsUserLocation }
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onTouchStart={() => setIsFollowingUser( false )}
        region={{
            latitude: cameraLocation.current.latitude,
            longitude: cameraLocation.current.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.2,
        }}>

            {isShowingPolyline && (

                <Polyline
                    coordinates={userLocationList}
                    strokeColor="black"
                    strokeWidth={5}
                />
            )}

            {/* Marcadores */}
            <Marker 
                coordinate={{
                latitude: 13.698935,
                longitude: -89.113761,
                }}
                title="Este es el título del marcador"
                description="Este es el cuerpo del marcador"
                //image={ require('../../../assets/marker.png') }
            />
        </MapView>

        {/* Linea de seguimiento */}
        <FAB
            iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
            onPress={() => setIsShowingPolyline(!isShowingPolyline)}
            style={{
            bottom: 140,
            right: 20,
            }}
        />

        <FAB
            iconName="radio-button-on-outline"
            onPress={moveToCurrentLocation}
            style={{ bottom: 20, right: 20, position: 'absolute' }}
            texto='Ubicacion actual'
        />

        <FAB
            iconName={isFollowingUser ? 'pause-circle-outline' : 'play-circle-outline'}
            onPress={() => setIsFollowingUser(!isFollowingUser)}
            style={{
            bottom: 80,
            right: 20,
            }}
        />
    </>
    
  )
}

const styles = StyleSheet.create({
    
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    
   });