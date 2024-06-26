import BackgroundGeolocation from "react-native-background-geolocation";
import { Alert } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { co3Api } from "../../config/api/co3Api";


const useBackgroundLocation = (userId: string) => {
    const [isTracking, setIsTracking] = useState(false);

    const startBackgroundTracking = () => {
        BackgroundGeolocation.ready({
            reset: true,
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 50,
            stopTimeout: 5,
            debug: false,
            logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
            stopOnTerminate: false,
            startOnBoot: true,
            url: 'YOUR_API_ENDPOINT', // Set your endpoint here
            batchSync: false,
            autoSync: true,
            params: {
                userId: userId
            },
        }, (state) => {
            if (!state.enabled) {
                BackgroundGeolocation.start();
                setIsTracking(true);
            }
        });

        BackgroundGeolocation.on('location', (location) => {
            co3Api.post('/ubicacion_usuario_2', {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                userId: userId
            }).catch(error => {
                console.error('Failed to send location', error);
            });
        });

        BackgroundGeolocation.on('error', (error) => {
            Alert.alert('Error', error.message);
        });
    };

    const stopBackgroundTracking = () => {
        BackgroundGeolocation.stop(() => {
            setIsTracking(false);
        });
    };

    useEffect(() => {
        return () => {
            stopBackgroundTracking();
        };
    }, []);

    return { startBackgroundTracking, stopBackgroundTracking, isTracking };
};

export default useBackgroundLocation;
