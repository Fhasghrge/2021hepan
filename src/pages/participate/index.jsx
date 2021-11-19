import { useState, useEffect } from 'react'
import {
  View,
  Button
} from '@tarojs/components'
import Taro from '@tarojs/taro'

import { getAwardInfo } from '../../API'
import './index.scss'

function AwardInfo({ awardLevel }) {
  return (
    <View className='get_award'>
      <View className='title'>恭喜您，中奖啦！</View>
      <View className='award_level'>{awardLevel}等奖</View>
      <View className='award_gift'>无人机</View>
      <Button onClick={() => Taro.navigateTo({ title: '/pages/infoSubmit/index' })}>填写领奖信息</Button>
    </View>
  )
}

function Participate() {
  const [award, setAward] = useState(0)
  const [awardList, setAwardList] = useState({})
  useEffect(() => {
    getAwardInfo().then(({data}) => {
      if(data.errcode) {
        Taro.showToast({title: data.errmsg})
        return
      }
      setAward(data.data.myAward)
    })
  }, [])
  return (
    <View>
      {
        award ?
          <AwardInfo awardLevel={award} />
          :
          <View className='no-award'>很遗憾，您未中奖</View>
      }
      <View className='award_list'>
        中奖名单
      </View>
    </View>
  )
}


export default Participate;
