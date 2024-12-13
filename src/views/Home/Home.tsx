import React, { useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import Header from './Header'; // Import Header component
import Main from './Main'; // Import Main component
import { useUserSlice } from '@modules/user';

const Home = () => {
  const { user } = useUserSlice();
  const [username, setUsername] = useState(user?.name || '');
  console.log('user', user);
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')} // Đường dẫn ảnh nền
        style={styles.backgroundImage}>
        {/* Header */}
        <Header username={username} />

        {/* Main */}
        <Main />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    paddingTop: 12,
  },
  container: {},
});

export default Home;
