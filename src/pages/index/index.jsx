import { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useModal, useScanCode, useRouter } from "taro-hooks";

import Introduce from './components/introduce';
import Pointer from './images/pointer.png'
import ScanLogo from './images/scan-red.png'
import './index.scss'

const WheelLogo = 'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/wheel-merge.png'

const Index = () => {
  const [count, setCount] = useState(1)
  const [scan, cameraScan] = useScanCode();
  const [showIntrod, setShowIntrod] = useState(false)
  const [show] = useModal({ mask: true, title: '扫码结果', showCancel: false });
  const [_, { navigateTo }] = useRouter()

  const handleScan = useCallback(
    (scanType) => {
      scan({ scanType }).then((res) => {
        show({ content: JSON.stringify(res) });
      });
    },
    [scan, show],
  );

  return (
    <View className='wrapper'>
      <View >
        <Text className='activity_introduce' onClick={() => setShowIntrod(true)}>活动介绍</Text>
        <Image className='scan_logo' onClick={() => handleScan('qrCode')} src={ScanLogo} />
      </View>
      <View className='debris_count'>抽奖次数{count}</View>
      <View className='wheel_wrapper'>
        <Image className='wheel' src={WheelLogo} />
        <Image className='pointer' src={Pointer} />
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
