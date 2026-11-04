import { 每秒郭氏帧 } from '@/数据/常量'
import 有CD技能通用类 from '../通用类/有CD技能通用类'

class 寂洪荒 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('寂洪荒-副手')
    if (this.模拟循环.校验奇穴是否存在('风骨')) {
      this.模拟循环.角色状态信息.寂洪荒连击 += 1
      if (this.模拟循环.角色状态信息.寂洪荒连击 >= 3) {
        this.触发伤害行为('寂洪荒-风骨')
        this.模拟循环.角色状态信息.寂洪荒连击 = 0
      }
    }
    if (this.模拟循环.校验奇穴是否存在('百节')) {
      this.模拟循环.添加buff({ 名称: '百节', 对象: '自身' })
    }
    this.模拟循环.技能类实例集合?.寂洪荒DOT?.获得和刷新寂洪荒DOT()
  }
}

class 飞刃回转 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('飞刃回转')
    this.模拟循环.角色状态信息.飞刃刀气结束时间 = this.模拟循环.当前时间 + 每秒郭氏帧 * 6
  }
}

class 乱天狼 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('乱天狼-主手')
    this.触发伤害行为('乱天狼-远距额外')
    this.模拟循环.减少技能调息('寂洪荒', 每秒郭氏帧 * 2)
  }
}

class 隐风雷 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('隐风雷-主手')
    if (this.模拟循环.校验奇穴是否存在('蹈厉')) {
      this.模拟循环.角色状态信息.蹈厉结束时间 = this.模拟循环.当前时间 + 每秒郭氏帧 * 6.5
    }
  }
}

class 青山共我 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('青山共我-山河渊隙')
    this.模拟循环.角色状态信息.青山标记结束时间 = this.模拟循环.当前时间 + 每秒郭氏帧 * 10
  }
}

class 金戈回澜 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('金戈回澜')
  }
}

class 斩无常 extends 有CD技能通用类 {
  本次作用次数 = 8

  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  释放前初始化(额外信息) {
    super.释放前初始化(额外信息)
    const 次数 = Number(额外信息?.作用次数)
    this.本次作用次数 = 次数 >= 1 && 次数 <= 8 ? 次数 : 8
  }

  命中() {
    this.触发伤害行为('斩无常', this.本次作用次数)
  }
}

class 星垂平野 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('星垂平野')
  }
}

class 幽冥窥月 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('幽冥窥月')
    if (this.模拟循环.校验奇穴是否存在('徵逐')) {
      this.模拟循环.添加buff({ 名称: '徵逐', 对象: '自身' })
    }
  }
}

class 血覆黄泉 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }
}

class 换行 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
  }
}

export { 寂洪荒, 飞刃回转, 乱天狼, 隐风雷, 青山共我, 金戈回澜, 斩无常, 星垂平野, 幽冥窥月, 血覆黄泉, 换行 }
