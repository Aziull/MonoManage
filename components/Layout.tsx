import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

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
    backgroundColor: '#e4d6f8',
  },
});

export default Layout;
