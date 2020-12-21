import React, { useState } from 'react';
import { Keyboard, Text, StyleSheet, TextInput, View, Modal, TouchableOpacity } from 'react-native';

const GroceryListItemEditor = props => {
    const [groceryListItemName, setGroceryListItemName] = useState((props.listItem && props.listItem.name) || '');
    const [groceryListItemPrice, setGroceryListItemPrice] = useState((props.listItem && props.listItem.price) || null);
    const [groceryListItemQuantity, setGroceryListItemQuantity] = useState((props.listItem && props.listItem.quantity) || null);

    const handleCancelPress = () => {
        props.onCancel();
    }

    const handleAddPress = () => {
        if(groceryListItemName !== '' && groceryListItemPrice > 0 && groceryListItemQuantity > 0){
            props.onAddToList({
                id: null,
                name: groceryListItemName,
                price: groceryListItemPrice,
                quantity: groceryListItemQuantity
            })

            setGroceryListItemName('');
            setGroceryListItemPrice(null),
            setGroceryListItemQuantity(null);

            Keyboard.dismiss();
        }
    }

    return (
        <Modal visible={props.visible || false} animationType={'slide'}>
            <View style={styles.container}>
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

                

                <TouchableOpacity activeOpacity={0.9} style={{...styles.button, backgroundColor: '#0B3861'}} onPress={handleAddPress}>
                    <Text style={{...styles.buttonText, color: '#fff'}}>Add to list</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.9} style={{...styles.button, backgroundColor: '#BDBDBD'}} onPress={handleCancelPress}>
                    <Text style={{...styles.buttonText, color: '#1C1C1C'}}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: '25%'
    },
    textInput: {
        width: '80%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        fontSize: 28,
        marginVertical: 15,
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
    }
});

export default GroceryListItemEditor;