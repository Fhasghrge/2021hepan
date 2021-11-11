import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text
} from '@tarojs/components'
import { useRouter } from 'taro-hooks'

import './index.scss'

const AWARD_LIST = [
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2Fipad2021.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FSwitch.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FGoPro%20HERO9%20Black.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FCanon%20sX720%E7%9B%B8%E6%9C%BA.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FAirPods3.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FApple%20Watch%20series3.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FBeats%20studio3%20wireless.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FSony%20SRS-XB33.JPG',
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list%2FSKG%E9%A2%88%E6%A4%8E%E6%8C%89%E6%91%A9%E4%BB%AAG7Pro.JPG',
]
function AwardList() {
  const [ _, { navigateTo }] = useRouter()
  return (
    <View>
      <View className='award_banner'>
        <Swiper
          className='award_swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay
        >
          {
            AWARD_LIST.map(url => <SwiperItem key={url}> <Image src={url} /> </SwiperItem> )
          }
        </Swiper>
        <View>
          <Text className='list'>一等奖： 无人机 </Text>
          <Text className='list'>二等奖： Airpods </Text>
          <Text className='list'>三等奖： 鼠标、键盘</Text>
          <Text className='list'>即将开奖 18 时 3 分 18 秒</Text>
        </View>
      </View>

      <View
        //TODO:  waiting for time control
        className='participate waiting'
        onClick={() => navigateTo('/pages/participate/index')}
      >
        待开奖
      </View>
    </View>
  )
}


export default AwardList;
