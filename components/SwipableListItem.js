import React, { useRef } from 'react';
import { Animated, Button, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SwipableListItem = props => {
    //TODO: get this from props
    

    const defaultButtonWidth = 75;

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
          pan.x.setValue(gestureState.dx);
        },
        onPanResponderRelease: (event, gestureState) => {
          const numActions = props.actions !== undefined ? props.actions.length : 0;
          const offset = defaultButtonWidth * numActions;
          if(gestureState.dx > -offset){
            pan.x.setValue(0);
          }
          else {
             pan.x.setValue(-offset);
          }
        }
      });

    const handleButtonPress = (item) => {
        pan.x.setValue(0);
        item.action(item);
    };

    return (
        <View style={styles.container}>
            <Animated.View {...panResponder.panHandlers} style={[pan.getLayout(), styles.labelContainer]}>
                
                    <Text style={styles.label}>{props.labelText}</Text>
                    {props.labelSubText && <Text style={styles.label}>{props.labelSubText}</Text>}
                
            </Animated.View>
            <View style={styles.buttonContainer}>
                {props.actions && props.actions.map(item => {
                    return (
                        <TouchableOpacity key={item.id} style={{...item.style, ...styles.button}} onPress={() => handleButtonPress(item)}>
                            <Text style={{...styles.buttonText, ...item.textStyle}}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        width: '100%',
        height: 80,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        position: 'relative'
      },
      labelContainer: {
        width: '100%',
        backgroundColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        zIndex: 1,
      },
      label: {
        fontSize: 20
      },
      buttonContainer: {
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
      },
      button: {
        width: 75,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF', 
        fontWeight: 'bold'
      }
});

export default SwipableListItem;