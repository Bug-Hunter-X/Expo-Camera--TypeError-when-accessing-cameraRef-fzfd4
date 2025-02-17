The solution uses useEffect hook to ensure cameraRef is available:

```javascript
import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) { // Check if cameraRef is available
      let photo = await cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  if (hasPermission === null) {
    return <View />; // Or loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: 'flex-end' }}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
              }}>
              {' '}Flip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: 'flex-end' }}
            onPress={takePicture}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
              }}>
              Take Picture
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
export default App; 
```