import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { 秒伤计算 } from '@/计算模块/计算函数'
import { 每秒郭氏帧 } from '@/数据/常量'
import 保存自定义循环弹窗 from '../通用/通用组件/保存自定义循环弹窗'
import 快速导入默认循环 from './constant/快速导入默认循环'
import 心法配置 from '../通用/通用组件/心法配置'
import 模拟器头部组件 from '../通用/通用组件/模拟器头部组件'
import 奇穴设置组件 from '../通用/通用组件/奇穴设置组件'
import 循环技能容器组件 from '../通用/通用组件/循环技能容器组件'
import DelaySettingModal from '../通用/通用组件/技能延迟弹窗'
import { 战斗曲线面板 } from '../通用/通用组件/战斗曲线弹窗'
import { use战斗曲线 } from '../通用/通用组件/战斗曲线弹窗/use战斗曲线'
import { 生成实际技能序列 } from '../通用/通用函数'
import CycleSimulatorContext from '../../context'
import 循环模拟技能基础数据, { 原始Buff数据 } from './constant/skill'
import { getDpsCycle } from './utils'
import { 根据奇穴修改buff数据 } from './simulator/utils'
import 模拟循环 from './simulator'
import { ShowCycleSingleSkill, 循环基础技能数据类型, 循环日志数据类型, 模拟信息类型 } from './simulator/type'
import AddCycleSkillBtns from './components/AddCycleSkillBtns'
import AddCycleSkillModal from './components/AddCycleSkillModal'
import StatusBar from './components/StatusBar'
import '../易筋经/index.css'

function CycleSimulator() {
  const {
    日志信息,
    更新日志信息,
    模拟DPS结果,
    更新模拟DPS结果,
    模拟器弹窗展示,
    更新模拟器弹窗展示,
    cycle,
    setCycle,
    大橙武模拟,
    加速值,
    更新加速值,
    网络延迟,
    更新网络延迟,
    启用团队增益快照,
    更新启用团队增益快照,
    奇穴信息,
    更新奇穴信息,
    秘籍信息,
    奇穴弹窗展示,
    更新奇穴弹窗展示,
    自定义循环保存弹窗,
    设置自定义循环保存弹窗,
    添加技能弹窗显示,
    更新添加技能弹窗显示,
    添加设置,
    更新添加设置,
    起手Buff配置,
    增益启用,
    当前副本事件实例列表,
  } = useContext(CycleSimulatorContext)

  const [模拟信息, 更新模拟信息] = useState<模拟信息类型>({
    角色状态信息: { 寂洪荒连击: 0 },
    当前时间: 0,
    当前自身buff列表: {},
    当前目标buff列表: {},
    循环执行结果: '成功',
    循环异常信息: {},
    技能基础数据: [...循环模拟技能基础数据],
    技能释放记录: [],
    当前各技能运行状态: {},
    当前DOT运行状态: {},
    当前GCD组: {},
  })
  const [延迟弹窗设置, 设置延迟弹窗设置] = useState<{
    open: boolean
    index?: number
    默认值?: number | 'GCD'
  }>({ open: false })

  const 团队增益轴 = useAppSelector((state) => state?.data?.团队增益轴)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (模拟器弹窗展示) {
      simulator({})
    }
  }, [
    模拟器弹窗展示,
    增益启用,
    cycle,
    网络延迟,
    秘籍信息,
    启用团队增益快照,
    加速值,
    奇穴信息,
    团队增益轴,
    当前副本事件实例列表,
    起手Buff配置,
  ])

  const simulator = (props?) => {
    const { 传入加速 = 加速值, 传入延迟 = 网络延迟, 更新展示 = true, 奇穴, 实时计算 = false } =
      props || {}
    const res = 模拟循环({
      测试循环: 生成实际技能序列(cycle),
      加速值: 传入加速 !== undefined ? 传入加速 : 加速值,
      网络延迟: 传入延迟 !== undefined ? 传入延迟 : 网络延迟,
      奇穴: 奇穴 || 奇穴信息,
      大橙武模拟,
      秘籍: 秘籍信息,
      启用团队增益快照,
      团队增益轴,
      副本事件实例列表: 当前副本事件实例列表,
      起手Buff配置,
    })
    if (更新展示) {
      更新日志信息(res.最终日志)
      计算dps(res.最终日志, res.当前时间)
      更新模拟信息({
        当前自身buff列表: res.当前自身buff列表,
        当前目标buff列表: res.当前目标buff列表,
        角色状态信息: res.角色状态信息,
        当前时间: res.当前时间,
        循环执行结果: res.循环执行结果,
        循环异常信息: res.循环异常信息,
        技能基础数据: res.技能基础数据,
        技能释放记录: res.技能释放记录,
        当前各技能运行状态: res.当前各技能运行状态,
        当前DOT运行状态: res.当前DOT运行状态,
        当前GCD组: res.当前GCD组,
      })
    }
    return res
  }

  const 计算dps = (data: 循环日志数据类型[], 当前时间) => {
    const 获取用于计算的技能组 = getDpsCycle(data)
    const { 秒伤, 计算结果技能列表, 秒伤计算时间, 总伤 } = dispatch(
      秒伤计算({
        更新循环技能列表: 获取用于计算的技能组,
        更新计算时间: 当前时间 / 每秒郭氏帧,
        更新奇穴数据: 奇穴信息,
        更新秘籍信息: 秘籍信息,
        更新增益启用: 增益启用,
      } as any),
    )
    更新模拟DPS结果({
      秒伤: 当前时间 > 0 ? 秒伤 : 0,
      总伤: 当前时间 > 0 ? 总伤 : 0,
      秒伤计算时间,
      计算结果技能列表,
    })
  }

  const 战斗曲线 = use战斗曲线({
    日志信息,
    总战斗用时帧: 模拟信息?.当前时间 || 0,
    团队增益轴,
    副本事件实例列表: 当前副本事件实例列表,
    启用团队增益快照,
    增益启用,
    监听增益列表: [],
    日志转循环: getDpsCycle,
    奇穴信息,
    秘籍信息,
  })

  const 处理循环结果对象 = useMemo(() => {
    const res: ShowCycleSingleSkill[][] = []
    cycle.forEach((item, index) => {
      const 找到当前技能释放记录 = 模拟信息?.技能释放记录?.[index]
      const data = {
        ...item,
        ...找到当前技能释放记录,
        index,
      }
      if (item.技能名称 === '换行' && index !== 0) {
        res.push([{ ...data }])
      } else if (!res.length) {
        res.push([{ ...data }])
      } else {
        res[res.length - 1] = [...res[res.length - 1], { ...data }]
      }
    })
    return { 显示循环: res, 完整循环: cycle }
  }, [cycle, 模拟信息])

  const 新增循环技能 = (item: 循环基础技能数据类型) => {
    setCycle([...(cycle || []), item])
  }

  const 批量新增循环 = (item: 循环基础技能数据类型[]) => {
    setCycle([...(cycle || []), ...item])
  }

  const 向循环内插入技能 = (item: 循环基础技能数据类型[], 插入位置, 插入索引) => {
    const 起点 = 插入位置 === '前部插入' ? 插入索引 : 插入索引 + 1
    const 新循环 = [...(cycle || []).slice(0, 起点), ...item, ...(cycle || []).slice(起点)]
    setCycle(新循环)
  }

  const 点击下拉菜单 = (data, index) => {
    if (data?.key === '设置延迟时间') {
      设置延迟弹窗设置({ open: true, index, 默认值: cycle?.[index]?.额外信息?.延迟 })
    } else {
      更新添加设置({ 位置: data?.key, 索引: index })
      更新添加技能弹窗显示(true)
    }
  }

  return (
    <>
      <Modal
        className='cycle-simulator-modal'
        maskClosable={false}
        width='100%'
        centered
        footer={null}
        open={模拟器弹窗展示}
        destroyOnClose
        onCancel={() => 更新模拟器弹窗展示(false)}
        title={
          <模拟器头部组件
            cycle={cycle}
            大橙武模拟={大橙武模拟}
            设置自定义循环保存弹窗={设置自定义循环保存弹窗}
            清空循环={() => setCycle([])}
            快速导入循环={(循环) => setCycle(循环)}
            更新奇穴信息={更新奇穴信息}
            更新奇穴弹窗展示={更新奇穴弹窗展示}
            加速值={加速值}
            更新加速值={更新加速值}
            网络延迟={网络延迟}
            更新网络延迟={更新网络延迟}
            模拟信息={模拟信息 as any}
            启用团队增益快照={启用团队增益快照}
            更新启用团队增益快照={更新启用团队增益快照}
            快速导入默认循环={快速导入默认循环 as any}
            战斗曲线数据={战斗曲线.曲线数据}
            on生成战斗曲线={战斗曲线.计算曲线数据}
          />
        }
      >
        <div className='cycle-simulator-setting'>
          <心法配置 原始Buff数据={根据奇穴修改buff数据(奇穴信息) as any} />
          <StatusBar
            模拟信息={模拟信息}
            日志信息={日志信息}
            模拟DPS结果={模拟DPS结果}
            奇穴信息={奇穴信息}
            模拟函数={simulator}
            战斗曲线面板展示={战斗曲线.战斗曲线面板展示}
            切换战斗曲线面板={战斗曲线.切换战斗曲线面板}
          />
          <循环技能容器组件
            处理循环结果对象={处理循环结果对象 as any}
            模拟信息={模拟信息 as any}
            cycle={cycle}
            setCycle={setCycle}
            原始Buff数据={原始Buff数据 as any}
            点击下拉菜单={点击下拉菜单}
            允许操作列表={['插入技能', '删除后续', '设置延迟']}
            压缩高度={战斗曲线.战斗曲线面板展示 ? 战斗曲线.压缩高度 : 0}
          />
        </div>
        <AddCycleSkillBtns
          新增循环技能={新增循环技能}
          批量新增循环={批量新增循环}
          处理循环结果对象={处理循环结果对象}
          模拟信息={模拟信息}
          大橙武模拟={大橙武模拟}
          奇穴信息={奇穴信息}
        />
        {战斗曲线.战斗曲线面板展示 ? (
          <战斗曲线面板
            open={战斗曲线.战斗曲线面板展示}
            onClose={() => 战斗曲线.切换战斗曲线面板(false)}
            曲线数据={战斗曲线.曲线数据}
            增益泳道列表={战斗曲线.增益泳道列表}
            onRefresh={战斗曲线.计算曲线数据}
            高度={战斗曲线.面板高度}
            on高度变化={战斗曲线.设置面板高度}
          />
        ) : null}
        <保存自定义循环弹窗
          自定义循环保存弹窗={自定义循环保存弹窗}
          设置自定义循环保存弹窗={设置自定义循环保存弹窗}
          获取计算循环数据={getDpsCycle}
          奇穴信息={奇穴信息}
          循环模拟={simulator}
          技能序列={cycle}
          启用团队增益快照={启用团队增益快照}
        />
        <奇穴设置组件
          奇穴信息={奇穴信息}
          更新奇穴信息={更新奇穴信息}
          奇穴弹窗展示={奇穴弹窗展示}
          更新奇穴弹窗展示={更新奇穴弹窗展示}
        />
        <AddCycleSkillModal
          向循环内插入技能={向循环内插入技能}
          处理循环结果对象={处理循环结果对象}
          模拟信息={模拟信息}
          大橙武模拟={大橙武模拟}
          奇穴信息={奇穴信息}
          添加设置={添加设置}
          添加技能弹窗显示={添加技能弹窗显示}
          关闭弹窗={() => {
            更新添加技能弹窗显示(false)
            更新添加设置({ 位置: '', 索引: 0 })
          }}
        />
        <DelaySettingModal
          open={延迟弹窗设置.open}
          默认值={延迟弹窗设置.默认值}
          onCancel={() => 设置延迟弹窗设置({ open: false })}
          保存={(延迟) => {
            const 索引 = 延迟弹窗设置.index
            setCycle(
              cycle.map((item, index) => {
                if (index !== 索引) return item
                if (!延迟) {
                  const 下一项 = { ...item }
                  delete 下一项.额外信息
                  return 下一项
                }
                return { ...item, 额外信息: { 延迟 } }
              }),
            )
            设置延迟弹窗设置({ open: false })
          }}
        />
      </Modal>
    </>
  )
}

export default CycleSimulator
