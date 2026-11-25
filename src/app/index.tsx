import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"

const App = () => {
  const [cameraPermission, cameraRequestPermission] = useCameraPermissions()

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

  return (
    <View style={styles.container}>
      <CameraView style={styles.cemera} facing="back" />
    </View>
  )
}

const styles = StyleSheet.create({
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
