import React, { useState } from 'react'
import { View, Text, Form, Input, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

function InfoSubmit() {
  const [inputValueObj, setInputValueObj] = useState({})
  const [submitValueObj, setSubmitObj] = useState({})
  function onSubmit(e) {
    e.preventDefault();
    console.log(inputValueObj)
    if (JSON.stringify(inputValueObj) === "{}" || Object.keys(inputValueObj).length !== 3) {
      Taro.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000
      })
      return
    }
    for (let key in inputValueObj) {//验证是否为空
      if (inputValueObj[key] === '') {
        Taro.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 500
        })
        return;
      }
    }
    for (let key in inputValueObj) {//验证输入
      let value = inputValueObj[key]
      switch (key) {
        case "name":
          if (value.length <= 1 || value.length >= 7) {
            Taro.showToast({
              title: '姓名输入有误',
              icon: 'none',
              duration: 1000
            })
            return;
          }
          break;
        case "number":
          if (value.length < 10 || value.length > 18 || isNaN(Number(value))) {
            Taro.showToast({
              title: '学号输入有误',
              icon: 'none',
              duration: 1000
            })
            return;
          }
          break;
        case "phone":
          if (value.length !== 11 || isNaN(Number(value))) {
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
    setSubmitObj(inputValueObj)
  }
  function handleChange(e) {
    let ev = e.target
    let obj = {
      [ev.id]: ev.value
    };
    setInputValueObj(inputValueObj => {
      return { ...inputValueObj, ...obj }
    })
  }

  return (
    <View className='index'>
      <View className="formBody">
        <Text className="title">填写领奖信息</Text>
        <Form>
          <View className="label">真实姓名</View>
          <Input
            className="infoInput"
            id='name'
            title='文本'
            type='text'
            onInput={handleChange}
          />
          <View className="label">学号</View>
          <Input
            className="infoInput"
            id='number'
            title='文本'
            type='number'
            onInput={handleChange}
          />
          <View className="label">联系方式</View>
          <Input
            className="infoInput"
            id='phone'
            title='文本'
            type='number'
            onInput={handleChange}
          />
          <Button onClick={onSubmit} className="submitButton">提交</Button>
        </Form>
      </View>
    </View>
  )
}


export default InfoSubmit;
