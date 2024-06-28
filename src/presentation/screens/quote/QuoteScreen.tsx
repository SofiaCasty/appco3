import React, { useEffect, useState } from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { Layout, Text, Button, Input, Divider, RadioGroup, Radio, Select, SelectItem } from '@ui-kitten/components';
import Select2 from 'react-native-select-two';
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
    let iva = selectedDocumentType === 0 ? subtotal * 0.13 : 0; // Assuming 0 is the index for "Credito Fiscal"
    let total = subtotal + iva;
    return { subtotal, iva, total };
  };

  const { subtotal, iva, total } = calculateTotal();

  return (
    <ScrollView>
      <Layout style={styles.section}>
        <Image style={styles.logo} source={require('../../../assets/LogoCSG1.png')} />
        <Text category='h5'>1. Selecciona un cliente:</Text>
        <Select2
          isSelectSingle
          style={{ borderRadius: 5, borderWidth: 1 }}
          colorTheme="#3498db"
          popupTitle="Selecciona un cliente"
          title="Selecciona un cliente"
          data={clientes.map(cliente => ({ id: cliente.id, name: cliente.company_name }))}
          onSelect={data => {
            const selected = clientes.find(cliente => cliente.id === data[0]);
            setSelectedCliente(selected);
          }}
          selectedData={selectedCliente ? [{ id: selectedCliente.id, name: selectedCliente.company_name }] : []}
          searchPlaceHolderText="Buscar..."
          selectButtonText="Seleccionar"
          cancelButtonText="Cancelar"
        />
        <Text style={styles.clientAddress}>{selectedCliente ? selectedCliente.company_name : ''}</Text>
        <Text style={styles.clientAddress}>{selectedCliente ? selectedCliente.address : ''}</Text>
      
        <Text category='h5'>2. Seleccione tipo de documento fiscal:</Text>
        <RadioGroup
          selectedIndex={selectedDocumentType}
          onChange={index => setSelectedDocumentType(index)}
        >
          <Radio>Credito Fiscal</Radio>
          <Radio>Factura</Radio>
          <Radio>Exportación</Radio>
        </RadioGroup>
      
        <Text category='h5'>3. Seleccione tipo y medio de pago:</Text>
        <Text>Tipo de Pago:</Text>
        <RadioGroup
          selectedIndex={selectedPaymentType}
          onChange={index => setSelectedPaymentType(index)}
        >
          <Radio>Contado</Radio>
          <Radio>Credito</Radio>
        </RadioGroup>
        <Text>Medio de Pago:</Text>
        <Select
          selectedIndex={selectedPaymentMethod}
          onSelect={index => setSelectedPaymentMethod(index)}
          value={paymentMethods[selectedPaymentMethod?.row]}
        >
          {paymentMethods.map((method, index) => (
            <SelectItem title={method} key={index} />
          ))}
        </Select>
      
        <Text category='h5'>Agregar productos:</Text>
        <Select2
          isSelectSingle
          style={{ borderRadius: 5, borderWidth: 1 }}
          colorTheme="#3498db"
          popupTitle="Selecciona un producto"
          title="Selecciona un producto"
          data={productos.map(producto => ({ id: producto.id, name: `${producto.barcode} || ${producto.name}` }))}
          onSelect={data => {
            const index = productos.findIndex(producto => producto.id === data[0]);
            setSelectedProductIndex(index);
          }}
          selectedData={selectedProductIndex !== null ? [{ id: productos[selectedProductIndex].id, name: `${productos[selectedProductIndex].barcode} || ${productos[selectedProductIndex].name}` }] : []}
          searchPlaceHolderText="Buscar..."
          selectButtonText="Seleccionar"
          cancelButtonText="Cancelar"
        />
        <Text style={styles.productInfo}>
          {selectedProductIndex !== null ? `${productos[selectedProductIndex].name}\nBC ${productos[selectedProductIndex].barcode}` : ''}
        </Text>
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
        <Layout style={styles.tableHeader}>
          <Text category="h6" style={styles.productName}>
            Producto
          </Text>
          <Text category="h6" style={styles.amountPrice}>
            Cantidad
          </Text>
          <Text category="h6" style={styles.amountPrice}>
            Precio
          </Text>
        </Layout>
        {products.map((product) => (
          <Layout key={product.id} style={styles.tableRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.amountPrice}>{product.amount}</Text>
            <Text style={styles.amountPrice}>${product.price.toFixed(2)}</Text>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden', // Para que los bordes redondeados se vean bien
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    flex: 1, // Para que ocupe el espacio restante
  },
  amountPrice: {
    width: 80, // Ancho fijo para cantidad y precio
    textAlign: 'right', // Alinear texto a la derecha
  },
  productInfo: {
    marginVertical: 10,
  },
});
