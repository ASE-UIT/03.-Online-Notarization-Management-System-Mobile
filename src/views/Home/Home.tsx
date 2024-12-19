import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import Header from './Header';
import Main from './Main';
import { useUserSlice } from '@modules/user';
import { StackProps } from '@navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation, route }: StackProps) => {
  const [username, setUsername] = useState('');
  const { user, setUser, dispatch } = useUserSlice();
  const handleNavigateToQRCode = () => {
    navigation.navigate('QRCodeStack');
  };
  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      dispatch(setUser(user));
      setUsername(user?.name || '');
    };
    fetchUser();
  }, []);
  const stackProps = { navigation, route };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('./assets/background.png')} style={styles.backgroundImage}>
        <Header username={username} onPress={() => handleNavigateToQRCode()} />
        <Main {...stackProps} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  container: {
    paddingBottom: '20%',
  },
});

export default Home;
