import { useState, useCallback } from 'react'
import { View, Image } from '@tarojs/components'
import { useToast, useRouter } from 'taro-hooks'

import './index.scss'

const PUZZLE_URL = 'https://2021hepan-img-1259454779.cos.ap-nanjing.myqcloud.com/puzzle-'

function Debris() {
  const [puzzles, setPuzzles] = useState([1, 2, 3,4, 5, 6, 7, 8, 9])
  const [show] = useToast({
    mask: true,
    duration: 2000,
    title: '请集齐九种碎片',
    icon: 'error',
  });
  const [ _, { navigateTo }] = useRouter()
  const handleParticipate = useCallback(
    () => {
      if(puzzles.length < 9) {
        show()
        return;
      }
      // 参与接口调用
      show({
        title: '参与成功',
        icon: 'success',
      }).then(() => {
        setTimeout(() => {
          navigateTo('/pages/awardList/index')
        }, 2300)
      })

    },
    [puzzles, show, navigateTo],
  )
  return (
    <View>
      <View className='title'>集齐卡片参与抽奖</View>
      <View className='puzzle_list'>
        {
          puzzles.map(puzzle => <Image key={puzzle} src={`${PUZZLE_URL}${puzzle}.png`} />)
        }
      </View>
      <View
        className={`participate ${puzzles.length === 9 ? 'together' : 'waiting'}`}
        onClick={handleParticipate}
      >
        参与抽奖
      </View>
    </View>
  )
}

export default Debris;
