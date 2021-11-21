import { View, Text, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { subInfo } from '../../API'
import './index.scss'

function InfoSubmit() {
  async function onSubmit(e) {
    const values = e.detail.value
    let err = false;
    Object.entries(values)
      .map(([_, rawValue]) => [_, rawValue.trim()])
      .forEach(([key, value]) => {
        switch(key) {
          case "name":
            if (value.length <= 1 || value.length >= 7) {
              err = true;
              Taro.showToast({
                title: '姓名输入有误',
                icon: 'none',
                duration: 1000
              })
              return;
            }
            break;
          case "schoolNum":
            const schoolNumReg = /^20(1|2)\d{7,18}$/;
            if (!schoolNumReg.test(value)) {
              err = true;
              Taro.showToast({
                title: '学号输入有误',
                icon: 'none',
                duration: 1000
              })
              return;
            }
            break;
          case "phoneNum":
            const phoneReg = /^1[3-9]\d{9}$/;
            if (!phoneReg.test(value)) {
              err = true;
              Taro.showToast({
                title: '联系方式输入有误',
                icon: 'none',
                duration: 1000
              })
              return;
            }
            break
          default:
            break;
        }
    })
    if(!err) {
      const { data } = await subInfo(values)
      if(data.errcode) {
        Taro.showToast({title: data.errmsg})
        return
      }
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/thanks/index'
        })
      }, 1000)
      Taro.showToast({
        title: '已提交',
        icon: 'success',
        duration: 1000
      })
    }
  }
  return (
    <View className='index'>
      <View className='formBody'>
        <Text className='title'>填写领奖信息</Text>
        <Form onSubmit={onSubmit}>
          <View className='label'>真实姓名</View>
          <Input
            className='infoInput'
            name='name'
            type='text'
          />
          <View className='label'>学号</View>
          <Input
            className='infoInput'
            name='schoolNum'
            type='number'
          />
          <View className='label'>联系方式</View>
          <Input
            className='infoInput'
            name='phoneNum'
            type='number'
          />
          <Button formType='submit' className='submitButton'>提交</Button>
        </Form>
      </View>
    </View>
  )
}


export default InfoSubmit;
