import { co3Api } from "../../config/api/co3Api"
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";

const returnUserToken = ( data: AuthResponse ) => {
    const user: User = {
        id: data.id,
        email: data.email,
        name: data.user,
    }

    return {
        user: user
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();
    try {
        const { data } = await co3Api.post<AuthResponse>('/Rlogin', {
            email,
            password,
        });

        return returnUserToken(data);

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await co3Api.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);
    } catch (error) {
        console.log({error});
        return null;
    }
}