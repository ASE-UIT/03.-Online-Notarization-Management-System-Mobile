import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import Header from './Header'; // Import Header component
import Main from './Main'; // Import Main component
import { useUserSlice } from '@modules/user';
import { StackProps } from '@navigator';

const Home = ({ navigation, route }: StackProps) => {
  const { user } = useUserSlice();
  const [username, setUsername] = useState(user?.name || '');
  console.log('user at Home', user);
  const handleNavigateToQRCode = () => {
    navigation.navigate('QRCodeStack');
  };
  useEffect(() => {
    setUsername(user?.name || '');
  }, [username]);
  const stackProps = { navigation, route };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('./assets/background.png')} // Đường dẫn ảnh nền
        style={styles.backgroundImage}>
        {/* Header */}
        <Header username={username} onPress={() => handleNavigateToQRCode()} />

        {/* Main */}
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
  container: {},
});

export default Home;
