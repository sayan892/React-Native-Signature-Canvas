import React from 'react'
import {View,Text,StyleSheet, Touchable, TouchableOpacity} from 'react-native'
import Slider from '@react-native-community/slider';
const PenTypePicker = ({visibility, penVal,setPenType,setPenDropdown,signatureRef }) => {
    const handlePenThickness = (val) => {
      setPenType(Math.round(val * 10)/10);
      
  }
  const setThicknessHandler = () => {
    setPenDropdown(false)
    signatureRef.current.changePenSize(0.2,Math.round(penVal * 10)/10 )
  }
    return (
  <>
    {visibility === true && (
        <View style={styles.penTypeContainer}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Choose your Pen Thickness
            </Text>
            <Text
              style={{
              textAlign: 'center',
              color: '#000',
              fontSize: 16,
              fontWeight: 'bold',
            }}>{Math.round(penVal * 10)/10}</Text>
          <Slider
              minimumValue={0}
              maximumValue={50}
              onValueChange={(value) => handlePenThickness(value)} />
            <TouchableOpacity style={styles.setBtn} onPress={setThicknessHandler}><Text style={{textAlign:'center',color:'#fff',fontSize:18,textTransform:'uppercase'}}>Set</Text></TouchableOpacity>
          </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  penTypeContainer: {
    width: '100%',
    height: '20%',
    bottom: '20%',
    borderWidth: 2,
    backgroundColor: '#fff',
    position: 'absolute',
  },
  setBtn: {
    borderRadius: 5,
    padding: 5,
    width: '20%',
    marginVertical:8,
    alignSelf:'center',
    backgroundColor: 'deepskyblue',
  }
});
export default PenTypePicker