import React from 'react'
import { 当前计算结果类型 } from '@/@types/输出'
import Buff from '../../../易筋经/components/StatusBar/buff'
import DpsRes from '../../../易筋经/components/StatusBar/dpsRes'
import '../../../易筋经/components/StatusBar/index.css'
import { 模拟信息类型 } from '../../simulator/type'

interface StatusBarProps {
  模拟信息: 模拟信息类型
  日志信息: any[]
  模拟DPS结果: 当前计算结果类型
  奇穴信息: string[]
  模拟函数: (e: any) => void
  战斗曲线面板展示?: boolean
  切换战斗曲线面板?: (open?: boolean) => void
}

function StatusBar(props: StatusBarProps) {
  const { 模拟信息, 日志信息, 模拟DPS结果, 奇穴信息, 模拟函数, 战斗曲线面板展示, 切换战斗曲线面板 } =
    props

  return (
    <div className='cycle-status-bar'>
      <Buff
        title='自身Buff'
        buff列表={模拟信息?.当前自身buff列表 as any}
        当前时间点={模拟信息?.当前时间}
        奇穴信息={奇穴信息 || []}
      />
      <Buff
        title='目标Buff'
        buff列表={模拟信息?.当前目标buff列表 as any}
        DOT列表={模拟信息?.当前DOT运行状态 as any}
        当前时间点={模拟信息?.当前时间}
      />
      <DpsRes
        模拟信息={模拟信息 as any}
        日志信息={日志信息 as any}
        模拟DPS结果={模拟DPS结果}
        模拟函数={模拟函数}
        战斗曲线面板展示={战斗曲线面板展示}
        切换战斗曲线面板={切换战斗曲线面板}
      />
    </div>
  )
}

export default StatusBar
