import React, { useState } from 'react';
import { Keyboard, Text, StyleSheet, TextInput, View, Modal, TouchableOpacity } from 'react-native';

const GroceryItemEdit = props => {
    const [id, setId] = useState(props.groceryItem.id);
    const [name, setName] = useState(props.groceryItem.name);
    const [price, setPrice] = useState(props.groceryItem.price);
    const [quantity, setQuantity] = useState(props.groceryItem.quantity);

    const handleCancelPress = () => {
        props.onCancel();
    }

    const handleSubmitPress = () => {
        if(name !== '' && price > 0 && quantity > 0){
            props.onSubmit({
                id: id,
                name: name,
                price: price,
                quantity: quantity
            })

            setId(null);
            setName('');
            setPrice(null),
            setQuantity(null);

            Keyboard.dismiss();
        }
    }

    return (
        <Modal visible={props.visible || false} animationType={'slide'}>
            <View style={styles.container}>
                <TextInput 
                style={styles.textInput} 
                value={name} 
                placeholder="Item Name"
                onChangeText={(text) => setName(text)} />

                <TextInput 
                style={styles.textInput} 
                value={price.toString()} 
                placeholder="Item Price"
                keyboardType={'decimal-pad'}
                onChangeText={(text) => setPrice(text)} />

                <TextInput 
                style={styles.textInput} 
                value={quantity.toString()} 
                placeholder="Quantity"
                keyboardType={'numeric'}
                onChangeText={(text) => setQuantity(text)} />

                <TouchableOpacity activeOpacity={0.9} style={{...styles.button, backgroundColor: '#3B0B0B'}} onPress={handleSubmitPress}>
                    <Text style={{...styles.buttonText, color: '#fff'}}>Save item</Text>
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
        paddingHorizontal: 10,
        paddingVertical: 25,
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
        marginVertical: 5,
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

export default GroceryItemEdit;