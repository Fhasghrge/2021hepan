import { View, Image, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import ColseLogo from '../images/close.png'
import './award.scss'

const PriceUrlHost = 'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/pieces_000'

function AwardFra({ hideButton, pice }) {

  return (
    <View className='awardWrapper'>
      <View className='introduce'>
        <View className='hide-wrapper'>
          <View className='fra-wrapper'>
            <Image
              src={`${PriceUrlHost}${pice - 1}_${pice}.png`}
            />
            <View className='fra-name'>碎片{pice}</View>
          </View>
        </View>
        <Button onClick={() => Taro.navigateTo({ url: '/pages/debris/index' })}>查看我的碎片</Button>
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

export default AwardFra;
