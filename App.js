import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GroceryListItemEditor from './components/GroceryListItemEditor';
import SwipableListItem from './components/SwipableListItem';

export default function App() {
  const salesTaxRate = 0.09;

  const [groceryListItems, setGroceryListItems] = useState([
    {
      id: 'randomID1',
      name: 'Bananas',
      price: 2.99,
      quantity: 1
    },
    {
      id: 'randomID2',
      name: 'Oranges',
      price: 0.99,
      quantity: 1
    },
    {
      id: 'randomID3',
      name: 'Ground Beef',
      price: 5.99,
      quantity: 1
    }
  ]);

  const handleAddToList = (groceryListItem) => {
    const nextId = 'listItem' + groceryListItem.name + Math.random().toString();
    groceryListItem.id = nextId.toString();
    setGroceryListItems([...groceryListItems, groceryListItem]);
  }

  const handleDeleteFromList = (groceryListItem) => {
    const newGroceryList = groceryListItems.filter(k => groceryListItem.id !== k.id);
    setGroceryListItems(newGroceryList);
  }

  const editItem = null;

  const roundMoney = money => {
    return (Math.round(money * 100) / 100).toFixed(2);
  }

  const groceryListItemTotals = groceryListItems.map(item => item.price * item.quantity);
  let subTotal = groceryListItemTotals.length > 0 
        ? groceryListItemTotals.reduce((a,b) => a + b) 
        : 0;
  const totalTax = subTotal * salesTaxRate;
  const total = subTotal + totalTax;

  
  

  return (
    <SafeAreaView style={styles.container}>
      <GroceryListItemEditor listItem={editItem} onAddToList={handleAddToList}/>

      <FlatList style={styles.groceryList} data={groceryListItems} renderItem={ ({item}) => 
        (
          <SwipableListItem 
            labelText={item.name + ' (' + item.quantity + ')'} 
            labelSubText={'$' + item.price} 
            actions={[{
                id: item.id + 'editAction',
                name: 'Edit',
                action: (item) => console.log('Edit: ', item),
                style: {
                    backgroundColor: '#0B2161'
                },
            },
            {
                id: item.id + 'deleteAction',
                name: 'Delete',
                action: () => handleDeleteFromList(item),
                style: {
                    backgroundColor: '#8A0808',
                }
            }]}/>
        )} />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.subTotal}>Sub-total: </Text>
          <Text style={styles.subTotal}>${roundMoney(subTotal)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.subTotal}>Tax: </Text>
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
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  },
  groceryList: {
    flex: 1,
    paddingBottom: 50
  },
  groceryListItem: {
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
    backgroundColor: '#3B0B0B'
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
