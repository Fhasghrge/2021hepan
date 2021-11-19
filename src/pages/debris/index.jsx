import { useState, useCallback, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { getMyFraList, participate } from '../../API'

import './index.scss'

const PUZZLE_URL = 'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/puzzle-'

function Debris() {
  const [puzzles, setPuzzles] = useState(Array(9).fill(0))

  const handleParticipate = useCallback(
    () => {
      if (!Math.min(...puzzles)) {
        Taro.showToast({
          mask: true,
          duration: 2000,
          title: '请集齐九种碎片',
          icon: 'error',
        })
        return;
      }
      // 参与接口调用
      Taro.getUserInfo({
        success: async ({ userInfo }) => {
          try {
            const {avatarUrl, nickName} = userInfo;
            const { errcode, errmsg = '未知错误' } = await participate(avatarUrl, nickName)
            if(errcode) {
              console.log(errmsg)
              return
            }
            Taro.showToast({
              title: '参与成功',
              icon: 'success',
            }).then(() => {
              setTimeout(() => {
                Taro.navigateTo({
                  url: '/pages/awardList/index'
                })
              }, 2300)
            })
          } catch (error) {
            console.log(error)
          }
        }
      })

    },
    [puzzles],
  )

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getMyFraList()
        if (data.errcode) {
          Taro.showToast({
            title: data.errmsg
          })
        }
        setPuzzles(data.data.sui)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <View>
      <View className='title'>集齐卡片参与抽奖</View>
      <View className='puzzle_list'>
        {
          puzzles.map((puzzle, index) => Boolean(puzzle) && <Image key={index} src={`${PUZZLE_URL}${index + 1}.png`} />)
        }
      </View>
      <View
        className={`participate ${Math.min(...puzzles) ? 'together' : 'waiting'}`}
        onClick={handleParticipate}
      >
        参与抽奖
      </View>
    </View>
  )
}

export default Debris;
