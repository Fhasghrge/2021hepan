import { useEffect, useState } from 'react'
import { View, Canvas, Button, Picker } from '@tarojs/components';
import drawQrcode from 'weapp-qrcode'
import Taro from '@tarojs/taro';
import { getQrCode } from '../../API'

import './index.scss'

const Braches = [
  '选择会场',
  '会场一',
  '会场二',
  '会场三',
  '会场四',
  '会场五',
  '会场六',
  '会场七',
  '会场八',
  '会场九',
  '会场十',
]

export default () => {
  const [currBranch, setCurrBranch] = useState(0)

  const refreshQrCode = async () => {
    try {
      const { data } = await getQrCode(currBranch)
      const { data: resData, errcode, errmsg = '未知错误'} = data;
      console.log(data)
      if(!errcode && currBranch) {
        drawQrcode({
          width: 200,
          height: 200,
          canvasId: 'myQrcode',
          text: JSON.stringify(resData),
        })
      } else {
        Taro.showToast({
          title:'没有选择会场/' + errmsg
        })
      }
    }catch(err) {
      console.log(err)
    }
  }

  const handleChangeBranch = ({detail}) => {
    setCurrBranch(Number(detail.value) + 1)
  }

  useEffect(() => {
    refreshQrCode()
  }, [currBranch])

  return (
    <View>
      <View className='title'>二维码只能扫一次</View>
      <Picker mode='selector' onChange={handleChangeBranch} range={Braches.slice(1)}>
        <View className='curr-branch'>{Braches[currBranch]}</View>
      </Picker>
      <Canvas className='scanCode' canvasId='myQrcode' />
      <Button onClick={refreshQrCode}>刷新二维码</Button>
    </View>
  )
}
