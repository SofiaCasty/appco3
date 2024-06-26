import { Layout, Spinner } from "@ui-kitten/components"
import { View, Text, ActivityIndicator } from "react-native"

export const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={30} color='black' />
    </View>
  )
}
