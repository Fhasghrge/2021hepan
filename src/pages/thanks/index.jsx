import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Thanks(props) {
  return (
    <View className="index">
      <Text>感谢您</Text>
      <Text>参与</Text>
      <Text>第14届清水河畔</Text>
      <Text>周年庆</Text>
      <Text>!</Text>
    </View>
  )
}
