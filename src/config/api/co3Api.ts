

import axios from "axios";
import { API_URL_ANDROID, API_URL as PROD_URL, STAGE } from "@env";
import { Platform } from "react-native";


export const API_URL = API_URL_ANDROID;

const co3Api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


export {
    co3Api,
}