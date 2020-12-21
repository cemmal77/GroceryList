import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GroceryItemAdd from "./components/GroceryItemAdd";
import GroceryItemEdit from './components/GroceryItemEdit';
import SwipableListItem from './components/SwipableListItem';

export default function App() {
  const salesTaxRate = 0.09;

  const [groceryListItems, setGroceryListItems] = useState([]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [focusedGroceryItem, setFocusedGroceryItem] = useState(null);

  const handleEditItemPress = (groceryItem) => {
    setFocusedGroceryItem(groceryItem);
    setIsEditMode(true);
  }

  const handleAddSubmit = (groceryItem) => {
    const nextId = 'listItem' + groceryItem.name + Math.random().toString();
    groceryItem.id = nextId.toString();
    setGroceryListItems([...groceryListItems, groceryItem]);
    setIsAddMode(false);
  }

  const handleEditSubmit = (groceryItem) => {
    console.log(groceryItem);
    const index = groceryListItems.map(k => k.id).indexOf(groceryItem.id);
    const newList = [...groceryListItems];
    newList[index] = groceryItem;
    setGroceryListItems(newList);
    setIsEditMode(false);
    setFocusedGroceryItem(null);
  }

  const handleCancel = () => {
    setIsAddMode(false);
    setIsEditMode(false);
    setFocusedGroceryItem(null);
  }

  const handleDeleteFromList = (groceryItem) => {
    const newGroceryList = groceryListItems.filter(k => groceryItem.id !== k.id);
    setGroceryListItems(newGroceryList);
  }

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
      <GroceryItemAdd 
        visible={isAddMode}
        onCancel={handleCancel}
        onSubmit={handleAddSubmit} />

      {focusedGroceryItem && <GroceryItemEdit 
        visible={isEditMode}
        groceryItem={focusedGroceryItem}
        onCancel={handleCancel}
        onSubmit={handleEditSubmit} />}

      <TouchableOpacity activeOpacity={0.9} style={{...styles.button, backgroundColor: '#3B0B0B'}} onPress={() => setIsAddMode(true)}>
        <Text style={{...styles.buttonText, color: '#fff'}}>Add new item</Text>
      </TouchableOpacity>

      <FlatList style={styles.groceryList} data={groceryListItems} renderItem={ ({item}) => 
        (
          <SwipableListItem 
            labelText={item.name + ' (' + item.quantity + ')'} 
            labelSubText={'$' + item.price} 
            actions={[{
                id: item.id + 'editAction',
                name: 'Edit',
                action: () => handleEditItemPress(item),
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
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#1C1C1C',
    shadowOpacity: 0.7,
    elevation: 20,
  },
  buttonText: {
    fontSize: 28,
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
