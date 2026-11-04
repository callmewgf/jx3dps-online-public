export interface 循环基础技能数据类型 {
  技能名称: string
  技能释放后添加GCD: number
  技能CD?: number
  技能GCD组?: string
  图标?: string
  技能类型?: string
  最大充能层数?: number
  说明?: string
  创建循环不可选?: boolean
  显示类型?: string
  是否为倒读条技能?: boolean
  额外信息?: { 延迟?: number | 'GCD' }
}

export interface BuffDTO {
  名称: string
  类型: string
  最大层数: number
  最大持续时间: number
  当前层数?: number
  刷新时间?: number
  图标?: string
  自然消失失去层数?: number
  备注?: string
}

export interface DotDTO extends BuffDTO {
  伤害频率: number
  初次频率?: number
  最大作用次数: number
  每次获得作用次数?: number
  是否吃加速?: boolean
}

export interface Buff枚举 {
  [key: string]: BuffDTO | DotDTO
}

export interface DOT待生效数据类型 {
  当前层数?: number
  生效时间?: number
  快照buff列表?: string[]
}

export interface DOT运行数据类型 {
  待生效数据: DOT待生效数据类型[]
}

export interface DOT列表 {
  [key: string]: DOT运行数据类型
}

export interface 技能运行数据类型 {
  当前层数: number
  待充能时间点: number[]
  充能满第一次释放时间点?: number
}

export interface 技能GCD组 {
  公共?: number
  自身?: number
  [key: string]: number | undefined
}

export type 日志类型 =
  | '释放技能'
  | '自身buff变动'
  | '目标buff变动'
  | '造成伤害'
  | '技能释放结果'
  | '等CD'
  | '循环异常'

export interface 循环日志数据类型 {
  日志: string
  日志类型?: 日志类型
  日志时间?: number
  buff列表?: string[]
  其他数据?: {
    伤害次数?: number
    技能等级?: number
  }
}

export interface 待生效事件 {
  事件名称: string
  事件时间: number
  事件备注?: any
}

export interface 技能释放记录结果 {
  实际伤害技能?: string
  特殊标记?: string
  造成buff数据?: any
}

export interface 技能释放记录数据 {
  技能名称: string
  计划释放时间: number
  实际释放时间: number
  开始读条时间?: number
  是否为读条技能: boolean
  技能释放记录结果: 技能释放记录结果
}

export interface 角色状态信息类型 {
  寂洪荒连击: number
  蹈厉结束时间?: number
  青山标记结束时间?: number
}

export interface 模拟信息类型 {
  角色状态信息: 角色状态信息类型
  当前时间: number
  当前自身buff列表: Buff枚举
  当前目标buff列表: Buff枚举
  循环执行结果: '成功' | '异常'
  循环异常信息: { 异常索引?: number; 异常信息?: any }
  技能基础数据: 循环基础技能数据类型[]
  技能释放记录: 技能释放记录数据[]
  当前各技能运行状态: Record<string, 技能运行数据类型>
  当前DOT运行状态: DOT列表
  当前GCD组: 技能GCD组
}

export interface ShowCycleSingleSkill extends 循环基础技能数据类型 {
  index?: number
  技能释放记录结果?: 技能释放记录结果
}
