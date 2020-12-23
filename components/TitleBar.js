import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import GlobalStyles from '../styles/GlobalStyles';

const TitleBar = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Shopping Cart</Text>
            
            <View style={styles.titleBarButtonContainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onButton1Press}>
                <Ionicons name="ios-add-circle" size={GlobalStyles.icon.large.size} color={GlobalStyles.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={props.onButton2Press}>
                <Ionicons name="ios-settings" size={GlobalStyles.icon.large.size} color={GlobalStyles.colors.darkAccent} />
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10
      },
      titleText: {
        fontSize: 38
      },
      titleBarButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
});

export default TitleBar;