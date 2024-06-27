import { Platform } from "react-native";
import { PermissionStatus } from "../../infrastructure/interfaces/permissions";
import { PERMISSIONS, check, openSettings, request, type PermissionStatus as RNPermissionStatus, RESULTS  } from "react-native-permissions";


export const requestLocationPermission = async():Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable';

    if( Platform.OS === 'ios'){
        // Primero solicita el permiso para usar la ubicación mientras se usa la aplicación
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (status === RESULTS.GRANTED) {
            // Ahora solicita el permiso para la ubicación en segundo plano
            status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
        }
    } else if ( Platform.OS === 'android'){
        // Primero solicita el permiso para usar la ubicación en primer plano
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (status === RESULTS.GRANTED) {
            // Ahora solicita el permiso para la ubicación en segundo plano
            status = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        }
    } else {
        throw new Error('Plataforma no soportada');
    }

    if( status === 'blocked' ){
        await openSettings();
        return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',

    };

    return permissionMapper[status] ?? 'unavailable';
}

export const checkLocationPermission = async():Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if( Platform.OS === 'ios'){

        // Primero solicita el permiso para usar la ubicación mientras se usa la aplicación
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

        if (status === RESULTS.GRANTED) {
            // Ahora solicita el permiso para la ubicación en segundo plano
            status = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
        }
    } else if ( Platform.OS === 'android'){

        // Primero solicita el permiso para usar la ubicación en primer plano
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (status === RESULTS.GRANTED) {
            // Ahora solicita el permiso para la ubicación en segundo plano
            status = await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
        }
    } else {
        throw new Error('Plataforma no soportada');
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',

    };

    return permissionMapper[status] ?? 'unavailable';
}