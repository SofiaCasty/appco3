import { Button, Card, Icon, Layout, Text } from "@ui-kitten/components";
import { useAuthStore } from "../../store/auth/useAuthStore";
import { MainLayout } from "../../layouts/MainLayout";
import Logo from '../../../assets/LogoCSG2.png';  // Asegúrate de que la ruta sea correcta
import { MyIcon } from "../../components/ui/MyIcon";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import useTrackLocation from "../../hooks/useTrackLocation";


export const HomeScreen = () => {
  const { logout, user } = useAuthStore();  // Suponiendo que 'user' tiene la información del usuario
  const navigation = useNavigation();  // Obtener el objeto de navegación
  const { startTracking, stopTracking, tracking } = useTrackLocation(user?.id);
  
  const onPressMandarUbicacion = () => {
    console.log("click");
    startTracking();
    return false;
  }


  // Handlers para las acciones de las tarjetas
  const handleCrearCotizacion = () => {
    // Lógica para crear cotización
    console.log("Crear Cotización");
  };

  const handleRegistrarVisita = () => {
    // Lógica para registrar visita
    console.log("Registrar Visita");
  };

  const handleRegistrarTurno = () => {
      if (tracking) {
          stopTracking();
      } else {
          startTracking();
      }
  };

  return (
    <MainLayout
      title="CO3"
      subTitle={user?.name} 
      rightAction={() => {}}
      rightActionIcon="plus-outline"
      logo={Logo}
    >
      <Layout style={{ padding: 16 }}>
        <Card style={styles.card} onPress={handleCrearCotizacion}>
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text category='h5' style={styles.text}>Crear Cotización</Text>
              <Text style={styles.text}>Aquí puedes crear una nueva cotización.</Text>
            </View>
            <MyIcon name="plus-outline" color="#fff" />
          </View>
        </Card>
        <Card style={styles.card} onPress={handleRegistrarVisita}>
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text category='h5' style={styles.text}>Registrar Visita</Text>
              <Text style={styles.text}>Aquí puedes registrar una nueva visita.</Text>
            </View>
            <MyIcon name="home-outline" color="#fff" />
          </View>
        </Card>
        {/* <Card style={styles.card} onPress={handleRegistrarTurno}>
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text category='h5' style={styles.text}>Empezar Turno</Text>
              <Text style={styles.text}>Aquí puedes empezar a registrar tu turno de entregas.</Text>
            </View>
            <MyIcon name="car-outline" color="#fff" />
          </View>
        </Card> */}
        <TouchableOpacity style={[styles.card, tracking ? styles.trackingCardOn : styles.trackingCardOff]} onPress={handleRegistrarTurno}>
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text category='h5' style={[styles.text, tracking ? styles.trackingCardOn : styles.trackingCardOff]}>Empezar Turno</Text>
                    <Text style={styles.text}>Aquí puedes empezar a registrar tu turno de entregas.</Text>
                </View>
                <MyIcon name="car-outline" color="#fff" />
            </View>
        </TouchableOpacity>

        
      </Layout>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.05,
    shadowRadius: 27,
    elevation: 10,
    padding: 0,
    overflow: 'hidden', 
  },
  gradient: {
    padding: 16,
    borderRadius: 10,
    margin: 0
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    color: '#1e1c24',
  },
  trackingCardOn: {
    backgroundColor: 'green',
    color: 'white'
  },
  trackingCardOff: {
    backgroundColor: 'red',
    color: 'white'
  },
});