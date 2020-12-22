import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddShoppingCartItem from "./components/AddShoppingCartItem";
import EditShoppingCartItem from './components/EditShoppingCartItem';
import SwipableListItem from './components/SwipableListItem';
import TitleBar from './components/TitleBar';
import GlobalStyles from './styles/GlobalStyles';


export default function App() {
  const [shoppingCartItems, setShoppingCartItems] = useState([]);

  const [isAddCartItemMode, setIsAddCartItemMode] = useState(false);
  const [isEditCartItemMode, setIsEditCartItemMode] = useState(false);
  const [isEditSettingsMode, setIsEditSettingsMode] = useState(false);
  const [focusedCartItem, setFocusedCartItem] = useState(null);
  const [salesTaxRate, setSalesTaxRate] = useState(0.10);

  const handleEditItemPress = (cartItem) => {
    setFocusedCartItem(cartItem);
    setIsEditCartItemMode(true);
  }

  const handleAddSubmit = (cartItem) => {
    const nextId = 'cartItem' + cartItem.name + Math.random().toString();
    cartItem.id = nextId.toString();
    setShoppingCartItems([...shoppingCartItems, cartItem]);
    setIsAddCartItemMode(false);
  }

  const handleEditSubmit = (cartItem) => {
    const index = shoppingCartItems.map(k => k.id).indexOf(cartItem.id);
    const newList = [...shoppingCartItems];
    newList[index] = cartItem;
    setShoppingCartItems(newList);
    setIsEditCartItemMode(false);
    setFocusedCartItem(null);
  }

  const handleCancel = () => {
    setIsAddCartItemMode(false);
    setIsEditCartItemMode(false);
    setFocusedCartItem(null);
  }

  const handleDeleteFromList = (cartItem) => {
    const newShoppingCart = shoppingCartItems.filter(k => cartItem.id !== k.id);
    setShoppingCartItems(newShoppingCart);
  }

  const roundMoney = money => {
    return (Math.round(money * 100) / 100).toFixed(2);
  }
  
  const shoppingCartTotals = shoppingCartItems.map(item => item.price * item.quantity);
  let subTotal = shoppingCartTotals.length > 0 
        ? shoppingCartTotals.reduce((a,b) => a + b) 
        : 0;
  const totalTax = subTotal * salesTaxRate;
  const total = subTotal + totalTax;


  return (
    <SafeAreaView style={styles.container}>
      <TitleBar onButton1Press={() => setIsAddCartItemMode(true)} onButton2Press={() => console.log('button 2 press')}/>

      <AddShoppingCartItem 
        visible={isAddCartItemMode}
        onCancel={handleCancel}
        onSubmit={handleAddSubmit} />

      {focusedCartItem && <EditShoppingCartItem 
        visible={isEditCartItemMode}
        cartItem={focusedCartItem}
        onCancel={handleCancel}
        onSubmit={handleEditSubmit} />}

      <FlatList style={styles.shoppingCart} data={shoppingCartItems} renderItem={ ({item}) => 
        (
          <SwipableListItem 
            labelText={item.name + ' (' + item.quantity + ')'}
            labelSubText={'$' + item.price} 
            labelContainerStyle={{backgroundColor: GlobalStyles.colors.lightAccent}}
            labelTextStyle={GlobalStyles.text.medium, GlobalStyles.text.dark}
            labelSubTextStyle={GlobalStyles.text.medium, GlobalStyles.text.dark}
            actions={[{
                id: item.id + 'editAction',
                name: 'Edit',
                action: () => handleEditItemPress(item),
                style: {
                    backgroundColor: GlobalStyles.colors.darkAccent
                },
                textStyle: {...GlobalStyles.text.light, ...GlobalStyles.text.small}
            },
            {
                id: item.id + 'deleteAction',
                name: 'Delete',
                action: () => handleDeleteFromList(item),
                style: {
                    backgroundColor: GlobalStyles.colors.danger,
                },
                textStyle: {...GlobalStyles.text.light, ...GlobalStyles.text.small}
            }]}/>
        )} />

      <View style={{...styles.summaryContainer, backgroundColor: GlobalStyles.colors.primary}}>
        <View style={styles.summaryRow}>
          <Text style={styles.subTotal}>Sub-total: </Text>
          <Text style={styles.subTotal}>${roundMoney(subTotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.subTotal}>Tax ({salesTaxRate * 100}%): </Text>
          <Text style={styles.subTotal}>${roundMoney(totalTax)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.total}>Total: </Text>
          <Text style={styles.total}>${roundMoney(total)}</Text>
        </View>  
      </View>          

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.lightShade,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  },
  shoppingCart: {
    flex: 1,
    paddingBottom: 50
  },
  shoppingCartItem: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5
  },
  summaryContainer: {
    padding: 20,
    width: '100%',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#fff'
  },
  subTotal: {
    fontSize: 20,
    color: '#fff'
  },
  total: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  }
});
