import { useEffect } from 'react'
import { View, Canvas, Button } from '@tarojs/components';
import drawQrcode from 'weapp-qrcode'

import './index.scss'


export default () => {
  useEffect(() => {
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: 'https://github.com/yingye',
    })
  }, [])
  return (
    <View>
      <View className='title'>二维码只能扫一次</View>
      <Canvas className='scanCode' canvasId='myQrcode' />
      <Button>刷新二维码</Button>
    </View>
  )
}
