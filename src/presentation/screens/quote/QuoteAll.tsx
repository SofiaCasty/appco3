import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { Layout, Text, Button, Input, Divider } from '@ui-kitten/components';
import { co3Api } from '../../../config/api/co3Api';
//import 'react-native-select-two-languages/languages/spanish';


export const QuoteScreen = () => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const paymentMethods = ['Tarjeta', 'Transferencia', 'Cheque', 'Efectivo'];

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesResponse = await co3Api.get('/all_customers2');
        setClientes(clientesResponse.data);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosResponse = await co3Api.get('/allProductos');
        if (Array.isArray(productosResponse.data)) {
          setProductos(productosResponse.data);
        } else {
          console.error('Error: el response de productos no es un array', productosResponse.data);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setProductos([]); // Asegúrate de que productos sea un array
      }
    };
    fetchProductos();
  }, []);

  const addProduct = () => {
    if (amount && price && selectedProductIndex !== null) {
      const newProduct = {
        id: products.length + 1,
        name: productos[selectedProductIndex]?.name || 'Nombre del Producto',
        amount: parseFloat(amount),
        price: parseFloat(price),
      };
      setProducts([...products, newProduct]);
      setAmount('');
      setPrice('');
    } else {
      alert('Cantidad, precio o producto no pueden ser 0');
    }
  };

  const calculateTotal = () => {
    let subtotal = products.reduce((sum, product) => sum + product.amount * product.price, 0);
    let iva = selectedPaymentMethod === 'Contado' ? subtotal * 0.13 : 0;
    let total = subtotal + iva;
    return { subtotal, iva, total };
  };

  const { subtotal, iva, total } = calculateTotal();

  return (
    <ScrollView>
      <Layout style={styles.section}>
        <Image style={styles.logo} source={require('../../../assets/LogoCSG1.png')} />
        <Text category='h5'>1. Selecciona un cliente:</Text>

        <Text style={styles.clientAddress}>{selectedCliente ? selectedCliente.company_name : ''}</Text>
      </Layout>

      <Divider />

      <Layout style={styles.section}>
        <Text category='h5'>2. Seleccione tipo de documento fiscal:</Text>
        {/* Implementa la selección de tipo de documento fiscal según tus necesidades */}
      </Layout>

      <Divider />

      <Layout style={styles.section}>
        <Text category='h5'>3. Seleccione tipo y medio de pago:</Text>
        <Text>Tipo de Pago:</Text>
        {/* Implementa la selección de tipo de pago según tus necesidades */}
        <Text>Medio de Pago:</Text>
        {/* Implementa la selección de medio de pago según tus necesidades */}
      </Layout>

      <Divider />

      <Layout style={styles.section}>
        <Text category='h5'>Agregar productos:</Text>

        <Input
          style={styles.input}
          placeholder="Cantidad"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <Input
          style={styles.input}
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Button onPress={addProduct}>Agregar</Button>
        <Layout style={styles.table}>
          <Text>Productos Agregados:</Text>
          {products.map(product => (
            <Layout key={product.id} style={styles.tableRow}>
              <Text>{product.name}</Text>
              <Text>{product.amount}</Text>
              <Text>{product.price}</Text>
            </Layout>
          ))}
        </Layout>
        <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text>IVA: ${iva.toFixed(2)}</Text>
        <Text>Total: ${total.toFixed(2)}</Text>
        <Button onPress={() => alert('Guardar')}>Guardar</Button>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  },
  clientAddress: {
    marginVertical: 10,
  },
  input: {
    marginVertical: 10,
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
