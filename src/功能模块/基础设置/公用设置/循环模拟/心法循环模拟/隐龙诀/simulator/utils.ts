import { 选中秘籍信息 } from '@/@types/秘籍'
import { 每秒郭氏帧 } from '@/数据/常量'
import 循环模拟技能基础数据, { 原始Buff数据 } from '../constant/skill'
import { 循环基础技能数据类型 } from './type'

export const 根据奇穴修改buff数据 = (_奇穴: string[], _秘籍?: 选中秘籍信息) => {
  const res = {}
  Object.keys(原始Buff数据).forEach((key) => {
    res[key] = JSON.parse(JSON.stringify(原始Buff数据[key]))
  })
  return res
}

export const 根据奇穴秘籍修改技能数据 = (
  奇穴: string[],
  _秘籍: 选中秘籍信息,
): 循环基础技能数据类型[] => {
  return 循环模拟技能基础数据.map((技能) => {
    if (技能.技能名称 === '寂洪荒') {
      const 调息 = (技能.技能CD || 0) - (奇穴?.includes('俟命') ? 每秒郭氏帧 : 0)
      return {
        ...技能,
        技能CD: Math.max(调息, 0),
        最大充能层数: 奇穴?.includes('风骨') ? 3 : 1,
      }
    }
    if (技能.技能名称 === '金戈回澜' && 奇穴?.includes('兵戈')) {
      return { ...技能, 技能CD: Math.max((技能.技能CD || 0) - 每秒郭氏帧 * 3, 0) }
    }
    return { ...技能 }
  })
}

export const ERROR_ACTION = {
  充能不足: {
    信息: '当前技能没有可释放层数',
  },
}

export const 转化buff和增益名称 = (增益名称, buff列表, 判定增益层数) => {
  if (判定增益层数) {
    return buff列表?.[增益名称]?.当前层数 === +判定增益层数 ? buff列表?.[增益名称] : undefined
  }
  return buff列表?.[增益名称]
}
