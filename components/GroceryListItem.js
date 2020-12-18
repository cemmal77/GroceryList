import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GroceryListItem = props => {
    return (
        <View style={styles.groceryListItem}>
          <Text>{props.listItem.name} {props.listItem.quantity > 1 && '(' + props.listItem.quantity + ')'}</Text>
          <Text>{'$' + props.listItem.price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    groceryListItem: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5
      }
});

export default GroceryListItem;