import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/async-storage";

export interface AuthState {
    user?: User;
    status: AuthStatus;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;

}

export const useAuthStore = create<AuthState>()((set, get) => ({

    status: 'checking',
    user: undefined,

    login: async (email: string, password: string) => {

        const resp = await authLogin(email, password);
        if( !resp ){
            set({ status: 'unauthenticated', user: undefined});
            return false;
        }

        console.log(resp);
        set({ status: 'authenticated', user: resp.user});
        return true;
    },

    logout: async () => {
        set({ status: 'unauthenticated', user: undefined});
    }

}))