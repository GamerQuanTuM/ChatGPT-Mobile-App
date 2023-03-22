/* eslint-disable prettier/prettier */
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {COLOURS, height, Icons, ROUTES} from '../constants';
import {HomeScreenCard} from '../components';

const HomeScreen = ({navigation}) => {
  const {Entypo, Feather, MaterialIcons} = Icons;
  return (
    <SafeAreaView style={styles.screen}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarText}>New Chat</Text>
        <Entypo
          name="plus"
          size={35}
          style={styles.plusIcon}
          onPress={() => navigation.navigate(ROUTES.NEW_CHAT)}
        />
      </View>
      <View style={[styles.horizontalLine]} />

      {/* Body */}
      <ScrollView style={styles.scrollableContent}>
        <Text style={styles.bodyTitle}>ChatGPT</Text>
        <View style={styles.card}>
          <HomeScreenCard
            title={'Examples'}
            icon={<Feather name="sun" size={25} />}
            firstText={'Explain quantum computing in simple terms'}
            secondText={'How do I make an HTTP request in Javascript?'}
            thirdText={'Got any creative ideas for a 10 year old’s birthday?'}
          />
          <HomeScreenCard
            title={'Capabilities'}
            icon={<Entypo name="flash" size={25} />}
            firstText={'Remembers what user said earlier in the conversation'}
            secondText={'Allows user to provide follow-up corrections'}
            thirdText={'Trained to decline inappropriate requests'}
          />
          <HomeScreenCard
            title={'Limitations'}
            icon={<MaterialIcons name="lock" size={25} />}
            firstText={'May occasionally generate incorrect information'}
            secondText={'Limited knowledge of world and events after 2021'}
            thirdText={'Limited knowledge of world and events after 2021'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: COLOURS.PRIMARY,
    flex: 1,
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginVertical: 10,
    marginTop: -5,
  },
  navbar: {
    height: height / 8 - 50,
    marginTop: 20,
    position: 'relative',
  },
  navbarText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 600,
    color: 'white',
  },
  scrollableContent: {
    zIndex: 2,
  },
  bodyTitle: {
    textAlign: 'center',
    fontWeight: 700,
    color: 'white',
    fontSize: 40,
  },
  plusIcon: {
    position: 'absolute',
    right: 20,
    top: -5,
    color: 'white',
  },
  menuIcon: {
    position: 'absolute',
    left: 20,
    top: -5,
    color: 'white',
  },
  card: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    gap: 25,
    marginBottom: 30,
  },
});

export default HomeScreen;
