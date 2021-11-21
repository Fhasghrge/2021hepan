import { View, Text, Image } from '@tarojs/components';
import ColseLogo from '../images/close.png'
import './introduce.scss'

function Introduce({ hideButton }) {
  return (
    <View className='black_wrapper'>
      <View className='introduce'>
        <View className='title'>河畔周年庆</View>
        <View className='content'>
          <Text className='line'>欢迎您参加清水河畔14周年庆祝活动！</Text>
          <Text className='line'>您在分会场参加活动后，扫描二维码可获得一次抽奖机会。</Text>
          <Text className='line'>集齐碎片即可参与抽奖，赢取丰厚奖品！</Text>
        </View>
        <Image
          className='close_logo'
          src={ColseLogo}
          onClick={() => {
            hideButton()
          }}
        />
      </View>
    </View>
  )
}

export default Introduce;
