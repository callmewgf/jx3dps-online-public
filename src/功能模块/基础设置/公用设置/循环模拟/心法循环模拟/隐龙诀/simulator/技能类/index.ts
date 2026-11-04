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
  }
}

class 隐风雷 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('隐风雷-主手')
  }
}

class 青山共我 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('青山共我-山河渊隙')
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
  constructor(模拟循环) {
    super(模拟循环)
    this.初始化技能运行数据()
  }

  命中() {
    this.触发伤害行为('斩无常')
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
  }
}

class 换行 extends 有CD技能通用类 {
  constructor(模拟循环) {
    super(模拟循环)
  }
}

export { 寂洪荒, 飞刃回转, 乱天狼, 隐风雷, 青山共我, 金戈回澜, 斩无常, 星垂平野, 幽冥窥月, 换行 }
