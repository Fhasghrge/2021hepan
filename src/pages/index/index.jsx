import { useCallback, useState, useEffect } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { useScanCode } from "taro-hooks";

import { Login, getTimes, getMyTime, getFra } from '../../API'
import Introduce from './components/introduce';
import Pointer from './images/pointer.png'
import ScanLogo from './images/scan-red.png'
import './index.scss'

const WheelLogo = 'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/wheel-merge.png'

const Index = () => {
  const [count, setCount] = useState(1)
  const [showIntrod, setShowIntrod] = useState(false)
  const [animation, setAnimation] = useState({})
  const [rotateScale, setRotateScale] = useState(250)
  const [scan] = useScanCode();

  const fetchTime = async () => {
    try {
      const { data } = await getMyTime()
      if(data.errcode) {
        console.log(data.errmsg)
        return
      }
      setCount(data.data.times)
    } catch (error) {
      console.log(error)
    }
  }

  const handleScan = useCallback(
    async (scanType) => {
      try {
        const { result } = await scan({ scanType })
        // 工作人员登陆入口
        if (result === 'admin') {
          Taro.navigateTo({
            url: '/pages/qrcode/index'
          })
          return
        }
        // 用户扫码
        const { token, gift } = JSON.parse(result)
        const { data } = await getTimes(token)
        if(data.errcode) {
          Taro.showToast({title: data.msg})
          return
        }
        if(!data.data.can) {
          Taro.showToast({title: '失效的二维码'})
          return
        }
        Taro.showModal({
          title: '🎉活动一次抽奖机会' + (gift ? '& 小奖品一份' : ''),
          complete: fetchTime
        })
      } catch (error) {
        console.log(error)
      }
    },
    [scan],
  );

  const animate = Taro.createAnimation({
    transformOrigin: "50% 50%",
    duration: 3000,
    timingFunction: "ease",
    delay: 50
  })


  useEffect(() => {
    Login().then(() => {
      fetchTime()
      setAnimation(animate.export())
    })
  }, [])

  const handleRotate = async () => {
    try {
      // check chance
      if(!count) {
        Taro.showToast({
          title: '抽奖机会已用尽，参加活动获取机会哦'
        })
        return
      }
      // fetch puzzle
      const { data: currFra } = await getFra()
      if(currFra.errcode) {
        Taro.showToast({title: currFra.errmsg})
        return
      }
      console.log('currFra', currFra.data.fragment)

      const puzzle = currFra.data.fragment[0];
      console.log(Math.floor(rotateScale / 360))
      const caclulateRotate =
        250
        + Math.floor(rotateScale / 360) * 360
        + 360 * 4
        + 40 * puzzle;
      // rotate wheel
      // show puzzle
      const animateRotate = Taro.createAnimation({
        transformOrigin: "50% 50%",
        duration: 2000,
        timingFunction: "ease",
        delay: 50
      })
      animateRotate.rotate(-caclulateRotate).step();
      setRotateScale(caclulateRotate);
      setAnimation(animateRotate.export());

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View className='wrapper'>
      <View className='header'>
        <Text className='activity_introduce' onClick={() => setShowIntrod(true)}>活动介绍</Text>
        <Image className='scan_logo' onClick={() => handleScan('qrCode')} src={ScanLogo} />
      </View>
      <View className='debris_count'>抽奖次数{count}</View>
      <View className='wheel_wrapper'>
        <View animation={animation} className='rotate-wrapper'>
          <Image className='wheel' id='rotate_target' src={WheelLogo} />
        </View>
        <Image className='pointer' onClick={handleRotate} src={Pointer} />
      </View>
      <Button
        className='my_debris'
        onClick={
          () => Taro.navigateTo({
            url: '/pages/debris/index'
          })
        }
      >
        我的碎片
      </Button>
      {
        showIntrod && <Introduce hideButton={() => setShowIntrod(false)} />
      }
    </View >
  );
};

export default Index;
