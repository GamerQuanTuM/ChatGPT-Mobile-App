/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLOURS, height, Icons, width} from '../constants';
import {axiosInstance} from '../../axios';

const NewChatScreen = () => {
  const {Feather, Entypo, AntDesign} = Icons;
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [chatGPT, setChatGPT] = React.useState([]);
  const [chatHistory, setChatHistory] = React.useState([]);

  function OnChangeInput(input) {
    setText(input);
  }

  const fetchAllChats = async excludeId => {
    try {
      const response = await axiosInstance.get(
        `/history${excludeId ? `?exclude=${excludeId}` : ''}`,
      );
      if (!response.data) {
        setLoading(true);
        return <NoData />;
      }
      setChatHistory(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  const handleRemove = async id => {
    try {
      await axiosInstance.delete(`/turbo-3.5/delete/${id}`);
      setChatHistory(chatHistory.filter(item => item._id !== id));
      if (chatHistory.length === 0) {
        setChatGPT([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/turbo-3.5/delete');
      setChatHistory([]);
      setChatGPT([]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/turbo-3.5', {
        content: text,
      });
      if (!response.data) {
        setLoading(true);
        return <NoData />;
      }
      setLoading(false);
      setChatGPT(response.data);
      setText('');
      await fetchAllChats();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingBody}>
        <Image
          source={{uri: 'https://links.papareact.com/2i6'}}
          style={styles.Logo}
        />
        <Text selectable={true} style={styles.LogoText}>
          ChatGPT is thinking!!!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* Body */}
      {chatHistory || chatGPT.response ? (
        <ScrollView style={styles.mainChatScreen}>
          {/* REMOVED FOR DUPLICATE RESPONSE */}
          {/* <View>
              <View style={styles.queryContainer}>
                <Text selectable={true} style={styles.query}>
                  {chatGPT.query}
                </Text>
              </View>
              <View style={styles.responseContainer}>
                <View style={styles.responseHeader}>
                  <Text selectable={true} style={styles.responseHeaderContent}>
                    ChatGPT Response
                  </Text>
                </View>
                <Text selectable={true} style={styles.response}>
                  {chatGPT && chatGPT.response?.replace(/\n/g, '\n')}
                </Text>
              </View>
            </View> */}

          {chatHistory?.map(({_id, response, query}) => (
            <View key={_id}>
              <Chat
                id={_id}
                response={response}
                query={query}
                AntDesign={AntDesign}
                handleRemove={handleRemove}
              />
            </View>
          ))}
        </ScrollView>
      ) : null}

      {chatHistory.length === 0 && <BlankScreen Entypo={Entypo} />}

      {chatHistory.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={handleDelete}>
          <Text selectable={true} style={styles.deleteButtonText}>
            Delete Everything
          </Text>
        </TouchableOpacity>
      )}

      {/* Input Box */}
      <View style={styles.fixedContent}>
        <View style={[styles.horizontalLine, {marginTop: 0}]} />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={OnChangeInput}
            value={text}
            selectionColor="white"
          />
          <Feather
            name="send"
            size={20}
            style={styles.sendIcon}
            onPress={handleSubmit}
            disabled={!text}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLOURS.PRIMARY,
  },
  mainChatScreen: {
    flex: 1,
    zIndex: 2,
    marginHorizontal: 10,
    marginTop: 20,
  },
  queryContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  query: {
    color: 'black',
    fontWeight: 600,
    fontSize: 15,
    flex: 1,
  },
  deleteLogo: {
    color: 'red',
  },
  responseContainer: {
    backgroundColor: 'black',
    marginVertical: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },
  responseHeader: {
    height: 40,
    backgroundColor: COLOURS.PRIMARY,
    justifyContent: 'center',
    borderTopRadius: 10,
  },
  responseHeaderContent: {
    color: 'white',
    fontWeight: 500,
    marginLeft: 20,
  },
  response: {
    color: 'white',
    marginHorizontal: 20,
    marginTop: 10,
  },
  horizontalLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    marginVertical: 10,
  },
  fixedContent: {
    zIndex: 1,
  },
  textInputContainer: {
    marginTop: 10,
    width: width,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  textInput: {
    width: width - 30,
    height: 0.06 * height,
    backgroundColor: COLOURS.SECONDARY,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
  },
  sendIcon: {
    position: 'absolute',
    right: 25,
    top: 15,
    color: 'white',
  },
  blankScreen: {
    alignItems: 'center',
    flex: 1,
  },
  arrow: {
    color: 'white',
  },
  prompt: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
  },
  loadingBody: {
    flex: 1,
    backgroundColor: '#11A37F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: 100,
    height: 100,
  },
  LogoText: {
    fontSize: 25,
    fontWeight: 800,
    color: 'white',
  },
  deleteButtonContainer: {
    width: width - 40,
    backgroundColor: 'red',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginVertical: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 500,
    fontSize: 20,
  },
  noDataContainer: {},
});

export default NewChatScreen;

const NoData = () => {
  return (
    <View style={styles.noDataContainer}>
      <Text>ChatGPT failed to give response</Text>
    </View>
  );
};

const BlankScreen = ({Entypo}) => {
  return (
    <View style={styles.blankScreen}>
      <Entypo size={50} name="arrow-with-circle-down" style={styles.arrow} />
      <Text selectable={true} style={styles.prompt}>
        Type a Prompt to get Response
      </Text>
    </View>
  );
};

const Chat = ({id, response, query, AntDesign, handleRemove}) => {
  return (
    <>
      <View style={styles.queryContainer}>
        <Text selectable={true} style={styles.query}>
          {query}
        </Text>
        <AntDesign
          size={25}
          name="delete"
          style={styles.deleteLogo}
          onPress={() => handleRemove(id)}
        />
      </View>
      <View style={styles.responseContainer}>
        <View style={styles.responseHeader}>
          <Text selectable={true} style={styles.responseHeaderContent}>
            ChatGPT Response
          </Text>
        </View>
        <Text selectable={true} style={styles.response}>
          {response?.replace(/\n/g, '\n')}
        </Text>
      </View>
    </>
  );
};
