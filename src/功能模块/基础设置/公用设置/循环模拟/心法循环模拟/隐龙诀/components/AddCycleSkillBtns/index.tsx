import React, { useMemo, useState } from 'react'
import { Badge, Space, Tooltip } from 'antd'
import { 每秒郭氏帧 } from '@/数据/常量'
import { 获取实际技能数据 } from '../../../通用/通用函数'
import 多段倒读条作用次数弹窗 from '../../../通用/通用组件/多段倒读条作用次数弹窗'
import { 循环基础技能数据类型, 技能GCD组, 模拟信息类型 } from '../../simulator/type'
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

const 分组 = ['隐雷鞭', '断水刃', '冲云链', '其他']

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
                <SkillBtn
                  key={item.技能名称}
                  技能={item}
                  模拟信息={模拟信息}
                  onClick={(额外) =>
                    新增循环技能(
                      额外?.作用次数
                        ? { ...item, 额外信息: { ...item.额外信息, 作用次数: 额外.作用次数 } }
                        : item,
                    )
                  }
                />
              ))}
          </Space>
        </div>
      ))}
    </div>
  )
}

function SkillBtn(props: {
  技能: 循环基础技能数据类型
  模拟信息: 模拟信息类型
  onClick: (额外?: { 作用次数?: number }) => void
}) {
  const { 技能, 模拟信息, onClick } = props
  const [打断弹窗, 设置打断弹窗] = useState(false)
  const 剩余秒 = 计算可以释放时技能CD(模拟信息, 技能)
  const 有充能 = !!技能.最大充能层数 && 技能.最大充能层数 > 1
  const 当前层数 = 有充能 ? 计算技能当前层数(模拟信息, 技能) : 0
  const 调息秒 = 技能.技能CD ? Math.round((技能.技能CD / 每秒郭氏帧) * 100) / 100 : 0
  const 提示 = useMemo(() => {
    if (剩余秒 > 0 && 有充能) return `充能中，下一层还需 ${剩余秒} 秒。${技能.说明 || ''}`
    if (剩余秒 > 0) return `冷却中，剩余 ${剩余秒} 秒。${技能.说明 || ''}`
    return 技能.说明 || ''
  }, [剩余秒, 有充能, 技能.说明])

  return (
    <>
      <div
        className='ztg-cycle-simulator-setting-btn'
        onClick={() => {
          if (技能.可中断倒读条最大跳数) {
            设置打断弹窗(true)
            return
          }
          onClick()
        }}
      >
        <Tooltip title={提示}>
          <Badge count={剩余秒 > 0 ? 剩余秒 : 0} className='cycle-add-btn-wrap' offset={[0, 0]}>
            {技能.图标 ? <img className='cycle-add-btn' src={技能.图标} alt='' /> : null}
            {有充能 ? <span className='cycle-add-btn-count'>{当前层数}</span> : null}
          </Badge>
        </Tooltip>
        <p className='cycle-add-btn-text'>{技能.技能名称}</p>
        {调息秒 ? (
          <p className='cycle-add-btn-text'>{有充能 ? `${调息秒}秒/层` : `${调息秒}秒`}</p>
        ) : null}
      </div>
      {技能.可中断倒读条最大跳数 ? (
        <多段倒读条作用次数弹窗
          open={打断弹窗}
          maxHit={技能.可中断倒读条最大跳数}
          title='斩无常提前打断'
          onCancel={() => 设置打断弹窗(false)}
          onSubmit={(次数) => onClick({ 作用次数: 次数 })}
        />
      ) : null}
    </>
  )
}

const 计算可以释放时技能CD = (模拟信息: 模拟信息类型, 技能: 循环基础技能数据类型) => {
  const 待充能时间点 = 模拟信息?.当前各技能运行状态?.[技能?.技能名称]?.待充能时间点
  if (!待充能时间点?.length) return 0
  const 可以释放时间 = (模拟信息?.当前时间 || 0) + (检查GCD(技能, 模拟信息.当前GCD组) || 0)
  const 下次预估释放时间 = 待充能时间点[0]
  if (下次预估释放时间 <= 可以释放时间) return 0
  return Math.round(((下次预估释放时间 - 可以释放时间) / 每秒郭氏帧) * 100) / 100
}

const 计算技能当前层数 = (模拟信息: 模拟信息类型, 技能: 循环基础技能数据类型) => {
  const 待充能时间点 = 模拟信息?.当前各技能运行状态?.[技能?.技能名称]?.待充能时间点
  return Math.max((技能?.最大充能层数 || 1) - (待充能时间点?.length || 0), 0)
}

const 检查GCD = (技能: 循环基础技能数据类型, GCD组: 技能GCD组) => {
  const 校验GCD组 = 技能.技能GCD组 === '自身' ? 技能.技能名称 : 技能.技能GCD组
  return 校验GCD组 ? GCD组?.[校验GCD组] || 0 : 0
}

export default AddCycleSkillBtns
