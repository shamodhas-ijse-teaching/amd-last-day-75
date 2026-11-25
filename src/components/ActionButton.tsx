import { View, Text, TouchableOpacity } from "react-native"
import React, { ComponentProps } from "react"
import MaterialIcons from "@react-native-vector-icons/material-icons"

type IconType = ComponentProps<typeof MaterialIcons>["name"]

interface ActionButtonPropsTypes {
  onPress: () => void
  icon: IconType
  color?: string
  size?: number
}

const ActionButton = ({
  onPress,
  icon,
  size = 44,
  color = "#fff"
}: ActionButtonPropsTypes) => {
    
  const sample = () => {}

  return (
    <TouchableOpacity onPress={onPress}>
      {icon && <MaterialIcons name={icon} color={color} size={size} />}
    </TouchableOpacity>
  )
}

export default ActionButton
