import React, { useState } from 'react';
import { Keyboard, Button, StyleSheet, TextInput, View } from 'react-native';

const GroceryListItemEditor = props => {
    const [groceryListItemName, setGroceryListItemName] = useState((props.listItem && props.listItem.name) || '');
    const [groceryListItemPrice, setGroceryListItemPrice] = useState((props.listItem && props.listItem.price) || null);
    const [groceryListItemQuantity, setGroceryListItemQuantity] = useState((props.listItem && props.listItem.quantity) || null);

    const handleAddPress = () => {
        if(groceryListItemName !== '' && groceryListItemPrice > 0 && groceryListItemQuantity > 0){
            props.onAddToList({
                id: null,
                name: groceryListItemName,
                price: groceryListItemPrice,
                quantity: groceryListItemQuantity
            })

            // setGroceryListItemName('');
            // setGroceryListItemPrice(null),
            // setGroceryListItemQuantity(null);

            Keyboard.dismiss();
        }
    }

    return (
        <View style={styles.groceryListItemEditContainer}>
            <TextInput 
            style={styles.textInput} 
            value={groceryListItemName} 
            placeholder="Item Name"
            onChangeText={(text) => setGroceryListItemName(text)} />

            <TextInput 
            style={styles.textInput} 
            value={groceryListItemPrice && groceryListItemPrice.toString()} 
            placeholder="Item Price"
            keyboardType={'decimal-pad'}
            onChangeText={(text) => setGroceryListItemPrice(text)} />

            <TextInput 
            style={styles.textInput} 
            value={groceryListItemQuantity && groceryListItemQuantity.toString()} 
            placeholder="Quantity"
            keyboardType={'numeric'}
            onChangeText={(text) => setGroceryListItemQuantity(text)} />

            <Button title="Add to list" onPress={handleAddPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    groceryListItemEditContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        padding: 20
      },
      textInput: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 20,
        marginVertical: 10
      },
});

export default GroceryListItemEditor;