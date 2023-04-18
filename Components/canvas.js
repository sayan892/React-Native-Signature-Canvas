import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import SignatureScreen from 'react-native-signature-canvas';
import Share from 'react-native-share';
import ToastModal from './Modal';
import PenColorPicker from './PenColorPicker';
import PenTypePicker from './PenTypePicker';
const Canvas = () => {
  const [penColor, setPenColor] = useState('yellow');
  const [penType,setPenType] = useState(0)
  const [signature, setSign] = useState('');
  const [colorDropdown, setColorDropdown] = useState(false);
  const [penDropdown, setPenDropdown] = useState(false);
  const [toastVisible, setToastVisible] = useState({
    visibility: false,
    message: '',
  });
  const ref = useRef();
  const handleUndo = () => {
    ref.current.undo();
  };

  const handleSignature = signature => {
    console.log(signature);
    setSign(signature);
  };
  const handleEnd = () => {
    ref.current.readSignature();
  };

  const handleRedo = () => {
    ref.current.redo();
  };
  const handleErase = () => {
    ref.current.erase();
  };

  const handleSave = async () => {
    var isReadGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (isReadGranted === PermissionsAndroid.RESULTS.GRANTED) {
      const dirs = RNFetchBlob.fs.dirs;
      setToastVisible({
        ...toastVisible,
        visibility: true,
        message: 'File Saved Successfully',
      });
      var image_data = signature.split('data:image/png;base64,');
      const filePath =
        dirs.DownloadDir +
        '/' +
        'signture' +
        new Date().getMilliseconds() +
        '.png';
      RNFetchBlob.fs
        .writeFile(filePath, image_data[1], 'base64')
        .then(() => {
          setTimeout(() => {
            setToastVisible({...toastVisible, visibility: false, message: ''});
          }, 1500);
        })
        .catch(errorMessage => {
          setToastVisible({
            ...toastVisible,
            visibility: true,
            message: 'File Could not be Saved',
          });
          setTimeout(() => {
            setToastVisible({
              ...toastVisible,
              visibility: false,
              message: '',
            });
          }, 1500);
        
          console.log(errorMessage);
        });
    }
  };
  const onShare = async () => {
    const shareOptions = {
      message: 'Use Canvas to draw your imaginatiion',
      url: signature,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(shareResponse));
    } catch (err) {
      console.log('Error =>', err);
    }
  };

  const canvasStyle = `.m-signature-pad--footer {display: none; margin: 0px;}.m-signature-pad {height:630px}`;
  React.useEffect(() => {
    console.log(penType);
  }, [penType]);
  return (
    <View style={styles.container}>
      <Text style={styles.headingTxt}>Draw Below</Text>
      <SignatureScreen
        ref={ref}
        webStyle={canvasStyle}
        penColor={penColor}
        maxWidth={penType}
        onOK={handleSignature}
        onEnd={handleEnd}
      />
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttons} onPress={handleUndo}>
          <Text style={styles.butnTxt}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={handleErase}>
          <Text style={styles.butnTxt}>Erase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => setColorDropdown(true)}>
          <Text style={styles.butnTxt}>Pen color</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => { setPenDropdown(true);setPenType(0)}}>
          <Text style={styles.butnTxt}>Pen Type</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={handleRedo}>
          <Text style={styles.butnTxt}>Redo</Text>
        </TouchableOpacity>
      
      </View>
      <View style={styles.row2}>
      <TouchableOpacity style={styles.buttons} onPress={onShare}>
          <Text style={styles.butnTxt}>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={handleSave}>
          <Text style={styles.butnTxt}>Save</Text>
        </TouchableOpacity>
        </View>
      <PenColorPicker
        visibility={colorDropdown}
        setColor={setPenColor}
        setDropdown={setColorDropdown}
        signatureRef={ref}
      />
      <ToastModal
        visibility={toastVisible.visibility}
        message={toastVisible.message}
      />
      <PenTypePicker visibility={penDropdown} penVal={penType} setPenType={setPenType} setPenDropdown={setPenDropdown}  signatureRef={ref}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
    alignItems: 'center',
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 8,
    alignItems: 'center',
  },
  headingTxt: {
    fontSize: 18,
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  buttons: {
    borderRadius: 5,
    padding: 8,
    backgroundColor: 'deepskyblue',
  },
  butnTxt: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
});

export default Canvas;
