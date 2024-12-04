import React from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Header from './Header'; // Import Header component
import Main from './Main'; // Import Main component

const Home = () => {
  return (
    <ImageBackground
      source={require('./assets/background.png')} // Đường dẫn ảnh nền
      style={styles.backgroundImage}>
      {/* Header */}
      <Header />

      {/* Main */}
      <Main />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 40,
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});

export default Home;
