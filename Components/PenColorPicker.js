import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const PenColorPicker = ({ visibility, setColor, setDropdown,signatureRef}) => {
  const colorOptions = [
    {colorVal: 'red'},
    {colorVal: 'blue'},
    {colorVal: 'yellow'},
    {colorVal: 'green'},
    {colorVal: 'black'},
  ];
  const handleColor = color => {
    setColor(color);
      setDropdown(false);
    signatureRef.current.changePenColor(color);
    signatureRef.current.draw();
  };
  return (
    <>
      {visibility === true && (
        <View style={styles.colorContainer}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Choose your Pen Color
          </Text>
          <View style={styles.colorOptionsContainer}>
            {colorOptions.map((item,index) => (
                <TouchableOpacity key={index} onPress={() => handleColor(item.colorVal)}>
                <View
                  style={[
                    styles.colorDot,
                    {backgroundColor: `${item.colorVal}`},
                  ]}></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  colorContainer: {
    width: '100%',
    height: '20%',
    bottom: '20%',
    borderWidth: 2,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  colorDot: {
    borderRadius: 50,
    width: 30,
    height: 30,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-around',
  },
});

export default PenColorPicker;
