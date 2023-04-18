import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ToastModal = ({visibility, message}) => {
  return (
    <>
      {visibility === true && (
        <View style={styles.toastOverlay}>
          <View style={[styles.toastContainer,message === 'File Could not be Saved' && {backgroundColor:'#FF6347'}]}>
            <Text style={styles.toastTxt}>{message}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  toastOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#00000097',
  },
  toastContainer: {
    width: '100%',
    padding: 12,
    backgroundColor: '#8CD77A',
    borderRadius: 10,
  },
  toastTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default ToastModal;
