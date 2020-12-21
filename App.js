import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { Animated, Dimensions, PanResponder, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GroceryListItem from './components/GroceryListItem';
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
  const pan = useRef(new Animated.ValueXY()).current;

  const handleAddToList = (newGroceryListItem) => {
      const nextId = 'listItem' + newGroceryListItem.name + Math.random().toString();
      console.log('next id: ', nextId);
      newGroceryListItem.id = nextId.toString();
      setGroceryListItems([...groceryListItems, newGroceryListItem]);
  }

  const actions = [
    {
        id: 'action1',
        name: 'Edit',
        action: (item) => console.log('Edit: ', item),
        style: {
            backgroundColor: '#0B2161'
        },
    },
    {
        id: 'action2',
        name: 'Delete',
        action: (item) => console.log('Delete: ', item),
        style: {
            backgroundColor: '#8A0808',
        }
    }
];

  const editItem = null;
  
  return (
    <SafeAreaView style={styles.container}>
      <GroceryListItemEditor listItem={editItem} onAddToList={handleAddToList}/>

      <FlatList style={styles.groceryList} data={groceryListItems} renderItem={ ({item}) => 
        (
          // <GroceryListItem listItem={item}/>
          <SwipableListItem labelText={item.name + ' (' + item.quantity + ')'} labelSubText={'$' + item.price} actions={actions}/>
        )} />

      {/* <SwipableListItem labelText="Coconuts (2)" labelSubText="$13.99" actions={actions}/>
      <SwipableListItem actions={actions}/>
      <SwipableListItem actions={actions}/> */}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center'
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
