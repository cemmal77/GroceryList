import React, { useState } from 'react';
import { Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles';


const EditSettings = props => {
    const [salesTaxRate, setSalesTaxRate] = useState(props.salesTaxRate);

    const handleCancelPress = () => {
        props.onCancel();
    }

    const handleSubmitPress = () => {
        if(salesTaxRate > 0){
            props.onSubmit(salesTaxRate);
            Keyboard.dismiss();
        }
    }

    return (
        <Modal visible={props.visible || false} animationType={'slide'}>
            <View style={styles.container}>
                <Text style={styles.titleText}>Edit Settings</Text>

                <View style={styles.form}>
                    <TextInput 
                        style={{...styles.textInput, ...GlobalStyles.text.large}} 
                        value={salesTaxRate.toString()} 
                        placeholder="Sales Tax Rate"
                        keyboardType={'numeric'}
                        onChangeText={(text) => setSalesTaxRate(text)} />

                    <TouchableOpacity 
                        activeOpacity={0.9} 
                        style={{...GlobalStyles.button, backgroundColor: GlobalStyles.colors.primary}} 
                        onPress={handleSubmitPress}>
                        <Text style={{...GlobalStyles.buttonText, ...GlobalStyles.text.light}}>Save</Text>
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
    },
});

export default EditSettings;