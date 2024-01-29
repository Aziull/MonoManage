import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Підключення для використання навігації
import secureStoreService from '../services/secureStoreService';

type PropsType = {
  children: any;
  style?: StyleProp<ViewStyle>;
};

const Layout = ({ children, style }: PropsType) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#0d2324',
  },
});

export default Layout;
