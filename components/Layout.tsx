import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Підключення для використання навігації
import secureStoreService from '../services/secureStoreService';
import { LinearGradient } from 'expo-linear-gradient';

type PropsType = {
  children: any;
  style?: StyleProp<ViewStyle>;
};

const Layout = ({ children, style }: PropsType) => {
  return (

      <LinearGradient
      style={[styles.container, style]}
        // Button Linear Gradient
        colors={['#7396a1', '#182931', '#101C26']}>

        {children}
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#259096',
  },
});

export default Layout;
