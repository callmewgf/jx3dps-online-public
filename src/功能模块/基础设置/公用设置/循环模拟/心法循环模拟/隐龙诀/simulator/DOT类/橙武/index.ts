import 通用DOT类 from '../../通用类/通用DOT类'

class 凌雪阁橙武DOT extends 通用DOT类 {
  获得凌雪阁橙武DOT() {
    const 当前最后一跳 =
      this.DOT运行数据?.待生效数据?.[this.DOT运行数据.待生效数据.length - 1] || {}
    const 当前层数 = 当前最后一跳?.当前层数 || 0
    const 最大层数 = this.获取当前DOT数据('凌雪阁橙武DOT')?.最大层数 || 3
    const 新层数 = Math.min(当前层数 + 1, 最大层数)
    this.更新待生效数据(新层数, this.获取当前DOT数据('凌雪阁橙武DOT'))
  }

  结算凌雪阁橙武DOT(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组 } = this.结算并更新运行数据(事件时间)
    结算数组?.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      if (数据.生效时间) {
        this.触发伤害行为('凌雪阁橙武DOT', 层数, [], 数据.生效时间)
      }
    })
  }
}

export default 凌雪阁橙武DOT
