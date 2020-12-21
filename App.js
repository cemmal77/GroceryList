import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import GroceryListItemEditor from './components/GroceryListItemEditor';
import SwipableListItem from './components/SwipableListItem';

export default function App() {
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
    paddingVertical: 25
  },
  groceryList: {
    flex: 1,
    //width: '80%'
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
});
