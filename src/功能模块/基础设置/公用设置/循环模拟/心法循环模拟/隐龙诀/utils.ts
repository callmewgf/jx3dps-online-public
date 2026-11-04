import { 循环技能详情 } from '@/@types/循环'

export const getDpsCycle = (data: { 日志?: string; 日志类型?: string; 其他数据?: { 伤害次数?: number; 技能等级?: number }; buff列表?: string[] }[]): 循环技能详情[] => {
  const res: { [key: string]: 循环技能详情 } = {}
  data.forEach((当前数据) => {
    if (当前数据?.日志类型 !== '造成伤害' || !当前数据.日志) return
    const 技能名称 = 当前数据.日志
    const 本次造成伤害次数 = 当前数据?.其他数据?.伤害次数 || 1
    const 本次技能等级 = 当前数据?.其他数据?.技能等级 || 1
    const 伤害层数 = 技能名称 === '寂洪荒dot-3层' ? 本次技能等级 : 1
    const key = `${技能名称}_${本次技能等级}`
    let 增益列表 = res[key]?.技能增益列表 || []
    const 当前增益名 = 当前数据?.buff列表?.join(',') || ''
    if (当前增益名) {
      const 已有 = 增益列表.find((item) => item.增益名称 === 当前增益名)
      if (已有) {
        已有.增益技能数 += 本次造成伤害次数
      } else {
        增益列表 = 增益列表.concat({
          增益名称: 当前增益名,
          增益技能数: 本次造成伤害次数,
        })
      }
    }
    res[key] = {
      技能名称,
      技能等级: 本次技能等级,
      技能数量: (res[key]?.技能数量 || 0) + 本次造成伤害次数,
      技能增益列表: 增益列表,
      伤害层数,
    }
  })
  return Object.values(res).map((item) => ({
    ...item,
    技能数量: Math.round(item.技能数量),
    技能增益列表: item.技能增益列表?.map((增益) => ({
      ...增益,
      增益技能数: Math.round(增益.增益技能数),
    })),
  }))
}
