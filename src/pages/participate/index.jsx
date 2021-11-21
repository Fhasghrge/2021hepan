import { useState, useEffect } from 'react'
import {
  View,
  Button,
  Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'

import { getAwardInfo } from '../../API'
import './index.scss'

function AwardInfo({ awardLevel }) {
  const MapNumerToWord = {
    '1': '一等奖',
    '2': '二等奖',
    '3': '三等奖',
    '4': '参与奖',
  }
  return (
    <View className='get_award'>
      <View className='title'>恭喜您，中奖啦！</View>
      <View className='award_level'>{MapNumerToWord[awardLevel]}</View>
      {/* <View className='award_gift'>无人机</View> */}
      <Button onClick={() => Taro.navigateTo({ url: '/pages/infoSubmit/index' })}>填写领奖信息</Button>
    </View>
  )
}

const mockData = {
  data: {
    myAward: 0,
    awardList: {
      level1: [{
        wxNickName: 'test1',
        picture: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
      }],
      level2: [
        {
          wxNickName: 'test2',
          picture: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        },
        {
          wxNickName: 'test2',
          picture: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        }
      ],
      level3: [
        {
          wxNickName: 'test3',
          picture: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        },
        {
          wxNickName: 'test3',
          picture: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        },
        {
          wxNickName: 'test3',
          picture: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'
        }
      ],
    }
  }
}

const AwardLevel = ({title, items}) => {
  console.log(items)
  return (
    <View className='award-level'>
      <View className='header'>{title}</View>
      <View className='body'>
        {
          items.map(({wxNickName, picture}, index) =>
            <View className='user' key={index}>
              <View className='img-wrapper'>
                <Image src={picture}></Image>
              </View>
              <View className='nickname'>{wxNickName}</View>
            </View>
          )
        }
      </View>
    </View>
  )
}

function Participate() {
  const [award, setAward] = useState(0)
  const [awardList, setAwardList] = useState(mockData.data.awardList)
  useEffect(() => {
    getAwardInfo().then(({data}) => {
      if(data.errcode) {
        Taro.showToast({title: data.errmsg})
        return
      }
      const {level1, level2, level3} = mockData.data.awardList;
      if(level1 && level2 && level3) {
        setAwardList(mockData.data.awardList)
      }
      setAward(mockData.data.myAward)
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
        <View className='title'>中奖名单</View>
        <AwardLevel title='一等奖' items={awardList.level1} />
        <AwardLevel title='二等奖' items={awardList.level2} />
        <AwardLevel title='三等奖' items={awardList.level3} />
      </View>
    </View>
  )
}


export default Participate;
