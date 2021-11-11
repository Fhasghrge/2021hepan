import { useState, useEffect } from 'react'
import {
  View,
  Button
} from '@tarojs/components'
import { useRouter } from 'taro-hooks'

import './index.scss'

function AwardInfo({ awardLevel }) {
  const [_, { navigateTo }] = useRouter()
  return (
    <View className='get_award'>
      <View className='title'>恭喜您，中奖啦！</View>
      <View className='award_level'>{awardLevel}等奖</View>
      <View className='award_gift'>无人机</View>
      <Button onClick={() => navigateTo('/pages/infoSubmit/index')}>填写领奖信息</Button>
    </View>
  )
}

function Participate() {
  const [isAward, setIsAward] = useState(true)
  useEffect(() => {
    // TODO:  fetch award info
  }, [])
  return (
    <View>
      {
        isAward ?
          <AwardInfo awardLevel='一' />
          :
          <View>很遗憾，您未中奖</View>
      }
      <View className='award_list'>
        中奖名单
      </View>
    </View>
  )
}


export default Participate;
