/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {width, COLOURS} from '../constants';

const Card = ({
  title,
  icon: Icon,
  firstText,
  secondText,
  thirdText,
  onData,
}) => {
  const [buttonText, setButtonText] = React.useState('');

  const handleClick = () => {
    onData(buttonText);
  };
  const handlePress = event => {
    const text =
      event._dispatchInstances.memoizedProps.children[0].props.children;
    setButtonText(text);
    handleClick();
  };

  return (
    <View style={styles.section}>
      <View style={styles.headingContainer}>
        <Text style={styles.icon}>{Icon}</Text>
        <Text style={styles.heading}>{title}</Text>
      </View>
      <View>
        {title === 'Examples' ? (
          <View style={{gap: 10}}>
            <TouchableOpacity style={styles.box} onPress={handlePress}>
              <Text style={styles.boxText}>{firstText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={handlePress}>
              <Text style={styles.boxText}>{secondText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.box} onPress={handlePress}>
              <Text style={styles.boxText}>{thirdText}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{gap: 10}}>
            <View style={styles.box}>
              <Text style={styles.boxText}>{firstText}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>{secondText}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxText}>{thirdText}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  section: {
    gap: 10,
    alignItems: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 15,
    color: 'white',
    fontWeight: 400,
  },
  icon: {
    color: 'white',
  },
  box: {
    width: width - 40,
    backgroundColor: COLOURS.SECONDARY,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: 400,
  },
});
