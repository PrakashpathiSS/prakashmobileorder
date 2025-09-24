import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {color} from '../../theme';

export function Loader(props) {
  const {
    loading,
    style: styleOverride,
    loaderStyle: loaderStyleOverride,
    color: loaderColor = '#E76F51',
    size = 'small',
  } = props;
  return (
    <View style={[styles.container, styleOverride, {display: loading? 'flex':'none'}]}>
      <View style={[styles.loader, loaderStyleOverride]}>
        <ActivityIndicator color={'#6D54CF'} size={size} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999
  },
  // loader: {paddingBottom: 100},
});
