import { 技能增益列表类型 } from '@/@types/技能'
import 获取快照增益 from '@/心法模块/统一数据/快照增益'

const 通用增益: 技能增益列表类型[] = [...获取快照增益()]

export default 通用增益
