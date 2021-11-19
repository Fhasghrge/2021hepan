import {
  View,
  Swiper,
  SwiperItem,
  Image,
  Text
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import moment from 'moment';

import { getRevealTime } from '../../API';

import './index.scss'

const AWARD_LIST = [
  'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/award_list/%E6%8A%B1%E6%9E%95.png',
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
  const [leftSeconds, setLeftSeconds] = useState(60)

  useEffect(() => {
    getRevealTime()
      .then(({data}) => {
        if(data.errcode) {
          Taro.showToast({title: data.errmsg})
          return
        }
        // TODO: waiting to change back
        // const subSeconds = moment(data.data.stilltime, "YYYY-MM-DD-hh:mm:ss").unix() - moment().unix();
        const subSeconds = 0;
        setLeftSeconds(subSeconds > 0 ? subSeconds : 0)
      })
      .catch((err) => {
        console.log(err)
      })
    const subTime = setInterval(() => {
      setLeftSeconds(pre => {
        return pre > 0 ? pre - 1 : 0
      })
    }, 1000)
    return () => {
      clearInterval(subTime)
    }
  }, [])

  const computeTime = (left, sub, pre) => {
    return Math.floor((left % pre) / sub)
  }

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
            AWARD_LIST.map(url => <SwiperItem key={url}> <Image mode='aspectFit' src={url} /> </SwiperItem> )
          }
        </Swiper>
        <View>
          <Text className='list'>一等奖：iPad/Switch/相机/手机 * 1</Text>
          <Text className='list'>二等奖：Airpods3 / Apple Watch3 *2</Text>
          <Text className='list'>三等奖： 口红 / 鼠标 / 键盘 * 5</Text>
          {/* <Text className='list'>即将开奖 {computeTime(leftSeconds, 3600, Infinity)} 时{computeTime(leftSeconds, 60, 3600)} 分{computeTime(leftSeconds, 1, 60)} 秒</Text> */}
          <Text className='list'>
            <Text className='time-label'>即将开奖</Text>
            <Text className='time-number'> {Math.floor(leftSeconds / 3600)} </Text>
            时
            <Text className='time-number'>{computeTime(leftSeconds, 60, 3600)}</Text>
            分
            <Text className='time-number'>{leftSeconds % 60}</Text>
            秒
          </Text>
        </View>
      </View>

      <View
        className={`participate ${leftSeconds === 0 ? 'together': 'waiting'}`}
        onClick={() => {
          if(leftSeconds === 0) {
            Taro.navigateTo({url: '/pages/participate/index'})
            return
          }
          Taro.showToast({
            title: '请等待开奖时间',
            icon: 'none'
          })
        }}
      >
        待开奖
      </View>
    </View>
  )
}


export default AwardList;
