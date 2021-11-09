import { useCallback, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

import Wheel from './images/wheel-merge.png'
import Pointer from './images/pointer.png'
import ScanLogo from './images/scan-red.png'
import './index.scss'

const Index = () => {
  const [count, setCount] = useState(1)
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);

  return (
    <View className='wrapper'>
      <View >
        <Text className='activity_introduce'>活动介绍 </Text>
        <Image className='scan_logo' src={ScanLogo} />
      </View>
      <Text className='debris_count'>抽奖次数{count}</Text>
      <View className='wheel_wrapper'>
        <Image className='wheel' src={Wheel} />
        <Image className='pointer' src={Pointer} />
      </View>
      <Button className='my_debris' onClick={() => setTitle("Taro Hooks Nice!")}>
        我的碎片
      </Button>
    </View >
  );
};

export default Index;
