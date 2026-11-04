import React from 'react'
import { Space } from 'antd'
import { 获取实际技能数据 } from '../../../通用/通用函数'
import { 循环基础技能数据类型, 模拟信息类型 } from '../../simulator/type'
import '../../../易筋经/components/AddCycleSkillBtns/index.css'

interface AddCycleSkillBtnsProps {
  新增循环技能: (data: 循环基础技能数据类型) => void
  批量新增循环: (data: 循环基础技能数据类型[]) => void
  处理循环结果对象: { 完整循环: 循环基础技能数据类型[] }
  模拟信息: 模拟信息类型
  大橙武模拟: boolean
  奇穴信息: string[]
  插入技能?: boolean
}

const 分组 = ['隐雷鞭', '断水刃', '其他']

function AddCycleSkillBtns(props: AddCycleSkillBtnsProps) {
  const { 新增循环技能, 批量新增循环, 模拟信息 } = props

  const 批量新增 = (技能序列: string[]) => {
    const 技能原始数据 = 技能序列
      .map((item) => {
        const { 实际技能名称, 额外信息 } = 获取实际技能数据(item)
        const 技能数据 = 模拟信息?.技能基础数据?.find((技能) => 技能.技能名称 === 实际技能名称)
        return 技能数据 ? { ...技能数据, 额外信息 } : null
      })
      .filter(Boolean) as unknown as 循环基础技能数据类型[]
    if (技能原始数据.length) {
      批量新增循环(技能原始数据)
    }
  }

  return (
    <div className='cycle-simulator-setting-btns'>
      <div className='cycle-simulator-setting-item'>
        <span className='ztg-cycle-btn-type'>快捷</span>
        <Space>
          <button type='button' onClick={() => 批量新增(['幽冥窥月', '寂洪荒', '飞刃回转', '乱天狼'])}>
            起手
          </button>
        </Space>
      </div>
      {分组.map((类型) => (
        <div className='cycle-simulator-setting-item' key={类型}>
          <span className='ztg-cycle-btn-type'>{类型}</span>
          <Space className='cycle-simulator-setting-skills' size={[8, 16]} wrap>
            {模拟信息?.技能基础数据
              ?.filter((item) => !item.创建循环不可选 && item.技能类型 === 类型)
              .map((item) => (
                <button type='button' key={item.技能名称} onClick={() => 新增循环技能(item)}>
                  {item.技能名称}
                </button>
              ))}
          </Space>
        </div>
      ))}
    </div>
  )
}

export default AddCycleSkillBtns
