import { useCallback, useState, useEffect } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import Taro from '@tarojs/taro';
import { useModal, useScanCode, useRouter } from "taro-hooks";

import Introduce from './components/introduce';
import Pointer from './images/pointer.png'
import ScanLogo from './images/scan-red.png'
import './index.scss'

const WheelLogo = 'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/wheel-merge.png'

const Index = () => {
  const [count, setCount] = useState(1)
  const [showIntrod, setShowIntrod] = useState(false)
  const [animation, setAnimation] = useState({})
  const [rotateScale, setRotateScale] = useState(90)
  const [scan] = useScanCode();
  const [show] = useModal({ mask: true, title: '扫码结果', showCancel: false });
  const [_, { navigateTo }] = useRouter()

  const handleScan = useCallback(
    async (scanType) => {
      const { result } = await scan({ scanType })
      if (result === 'admin') {
        Taro.navigateTo({
          url: '/pages/qrcode/index'
        })
        return
      }
      show({ content: JSON.stringify(result) })
    },
    [scan, show],
  );

  const animate = Taro.createAnimation({
    transformOrigin: "50% 50%",
    duration: 3000,
    timingFunction: "ease",
    delay: 50
  })

  useEffect(() => {
    setAnimation(animate.export())
  },[])

  const handleRotate = () => {
    // check chance
    // fetch puzzle
    const puzzle = 4;

    const caclulateRotate = rotateScale - 360 * 4 - 40 * puzzle + 20;
    // rotate wheel
    // show puzzle
    const animateRotate = Taro.createAnimation({
      transformOrigin: "50% 50%",
      duration: 2000,
      timingFunction: "ease",
      delay: 50
    })
    animateRotate.rotate(caclulateRotate).step();
    setRotateScale(caclulateRotate);
    setAnimation(animateRotate.export());
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
      <Button className='my_debris' onClick={() => navigateTo('/pages/debris/index')}>
        我的碎片
      </Button>
      {
        showIntrod && <Introduce hideButton={() => setShowIntrod(false)} />
      }
    </View >
  );
};

export default Index;
