import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { co3Api } from "../../config/api/co3Api";

const useTrackLocation = (userId: string) => {
    const [tracking, setTracking] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const startTracking = () => {
        const id = setInterval(async () => {
            const location = await getLocation();
            if (location) {
                sendLocationToApi(location.latitude, location.longitude, userId);
            }
        }, 60000); // 300000 ms = 5 minutes
        setIntervalId(id);
        setTracking(true);
    };

    const stopTracking = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setTracking(false);
    };

    const getLocation = async () => {
        return new Promise<Location | null>((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                error => {
                    Alert.alert('Error', error.message);
                    resolve(null);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        });
    };

    useEffect(() => {
        return () => {
            stopTracking();
        };
    }, []);

    const sendLocationToApi = async (latitude: number, longitude: number, userId: string) => {
        try {
            await co3Api.post('/ubicacion_usuario', {
                latitude,
                longitude,
                userId
            });
        } catch (error) {
            console.error('Failed to send location', error);
        }
    };

    return { startTracking, stopTracking, tracking };
};

export default useTrackLocation;
