import React, { useEffect, useRef } from 'react';
import { Animated, Button, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SwipableListItem = props => {
    //Reference item to store the most current animation state
    const listItemAnimation = useRef(new Animated.Value(0)).current;
    //Grid values for the current item's position state
    const pan = useRef(new Animated.ValueXY()).current;

    const defaultButtonWidth = 75;
    const animationSpeed = 300;

    //Calculates the total number of actions supplied in props
    const numActions = props.actions !== undefined ? props.actions.length : 0;

    //This value is the total width of all buttons. It it used to determine how far to slide
    //the animation state for showing/hiding the buttons
    const offset = defaultButtonWidth * numActions;

    //Responds to the current gesture state by starting animations for left/right swipes
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
          //swipe left
          if(gestureState.dx < 0){
            Animated.timing(listItemAnimation, {
              toValue: -offset,
              duration: animationSpeed,
              useNativeDriver: true
            }).start();
          }

          //swipe right
          if(gestureState.dx >= 0){
            Animated.timing(listItemAnimation, {
              toValue: 0,
              duration: animationSpeed,
              useNativeDriver: true
            }).start();
          }
        }
      });

    //Default handler for button press.
    const handleButtonPress = (item) => {
        //pan.x.setValue(0);
        item.action();
    };

    //Listens to the animation state and adjusts the list item position accordingly.
    useEffect(()=> {
      listItemAnimation.addListener((animation) => {
        pan.x.setValue(animation.value);
      });
    }, []);

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