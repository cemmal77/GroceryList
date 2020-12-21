import React, { useEffect, useState } from 'react';
import { Keyboard, Text, StyleSheet, TextInput, View, Modal, TouchableOpacity } from 'react-native';

const GoceryItemAdd = props => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);

    const handleCancelPress = () => {
        props.onCancel();
    }

    const handleSubmitPress = () => {
        if(name !== '' && price > 0 && quantity > 0){
            props.onSubmit({
                id: null,
                name: name,
                price: price,
                quantity: quantity
            })

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
                value={price && price.toString()} 
                placeholder="Item Price"
                keyboardType={'decimal-pad'}
                onChangeText={(text) => setPrice(text)} />

                <TextInput 
                style={styles.textInput} 
                value={quantity && quantity.toString()} 
                placeholder="Quantity"
                keyboardType={'numeric'}
                onChangeText={(text) => setQuantity(text)} />

                <TouchableOpacity activeOpacity={0.9} style={{...styles.button, backgroundColor: '#3B0B0B'}} onPress={handleSubmitPress}>
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

export default GoceryItemAdd;