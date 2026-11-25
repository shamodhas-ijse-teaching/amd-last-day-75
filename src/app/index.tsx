import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions
} from "expo-camera"
import { useRef, useState } from "react"
import ActionButton from "@/components/ActionButton"
import * as MediaLibrary from "expo-media-library"

const App = () => {
  const [cameraPermission, cameraRequestPermission] = useCameraPermissions()
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions()

  const [facing, setFacing] = useState<CameraType>("back")
  const cameraRef = useRef<CameraView>(null)
  const [captedPhoto, setCaptedPhoto] = useState<any>(null)
  if (!cameraPermission) return <View />
  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <TouchableOpacity
          onPress={cameraRequestPermission}
          style={styles.permitionButton}
        >
          <Text>grant permission</Text>
        </TouchableOpacity>
      </View>
    )
  }
  const handleCameraFlip = () => {
    setFacing(facing == "back" ? "front" : "back")
  }
  const handleTakePicture = async () => {
    if (!cameraRef || !cameraRef.current) return
    const photo = await cameraRef.current.takePictureAsync()
    if (photo.uri) setCaptedPhoto(photo.uri)

    if (!mediaPermission?.granted) {
      const res = await requestMediaPermission()
      if (!res.granted) {
        return Alert.alert(
          "Permision denied",
          "Cannot save photo without permition..!"
        )
      }
    }

    try {
      await MediaLibrary.Asset.create(photo.uri)
      Alert.alert("Photo saved", "")
    } catch (err) {
      Alert.alert("Somthing went wrong", "")
    }
  }

  return (
    <View style={styles.container}>
      {captedPhoto && (
        <View
          style={{
            position: "absolute",
            top: 56,
            left: 20,
            width: 100,
            height: 150,
            borderRadius: 8,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: "#00000070"
          }}
        >
          <Image
            source={{ uri: captedPhoto }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      )}
      <CameraView
        ref={cameraRef}
        style={styles.cemera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={(scanningResult: BarcodeScanningResult) => {
          console.log(scanningResult.data)
        }}
      />

      <View style={styles.actionContainer}>
        <ActionButton onPress={handleCameraFlip} icon="flip-camera-android" />
        <ActionButton onPress={handleTakePicture} icon="camera" />
        <ActionButton onPress={() => {}} icon="photo-library" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  cemera: { flex: 1 },
  permitionButton: {
    padding: 10,
    backgroundColor: "#0099ff"
  }
})

export default App
