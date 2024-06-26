import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useAuthStore } from "../store/auth/useAuthStore";
import { Children, PropsWithChildren, useEffect } from "react";
import { RootStackParams } from "../navigation/StackNavigator";

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { status } = useAuthStore();

    useEffect(() => {
      if( status !== 'checking'){
        if( status === 'authenticated' ){
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }]
            })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }]
            })
        }
      }
    }, [status])
    
  return (
    <>{ children }</>
  )
}
