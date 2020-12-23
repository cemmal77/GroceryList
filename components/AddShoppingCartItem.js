import React, { useState } from 'react';
import { Keyboard, Text, StyleSheet, TextInput, View, Modal, TouchableOpacity } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';

const AddShoppingCartItem = props => {
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
                <Text style={styles.titleText}>Add Item</Text>

                <View style={styles.form}>
                    <TextInput 
                    style={{...styles.textInput, ...GlobalStyles.text.large}} 
                    value={name} 
                    placeholder="Item Name"
                    onChangeText={(text) => setName(text)} />

                    <TextInput 
                    style={{...styles.textInput, ...GlobalStyles.text.large}} 
                    value={price && price.toString()} 
                    placeholder="Item Price"
                    keyboardType={'decimal-pad'}
                    onChangeText={(text) => setPrice(text)} />

                    <TextInput 
                    style={{...styles.textInput, ...GlobalStyles.text.large}} 
                    value={quantity && quantity.toString()} 
                    placeholder="Quantity"
                    keyboardType={'numeric'}
                    onChangeText={(text) => setQuantity(text)} />

                    <TouchableOpacity 
                        activeOpacity={0.9} 
                        style={{...GlobalStyles.button, backgroundColor: GlobalStyles.colors.primary}} 
                        onPress={handleSubmitPress}>
                            <Text style={{...GlobalStyles.buttonText, ...GlobalStyles.text.light}}>Add to list</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        activeOpacity={0.9} 
                        style={{...GlobalStyles.button, backgroundColor: GlobalStyles.colors.lightAccent}} 
                        onPress={handleCancelPress}>
                            <Text style={{...GlobalStyles.buttonText, ...GlobalStyles.text.dark}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: '25%'
    },
    form: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    titleText: {
        fontSize: 38,
      },
    textInput: {
        width: '80%',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 15,
    }
});

export default AddShoppingCartItem;