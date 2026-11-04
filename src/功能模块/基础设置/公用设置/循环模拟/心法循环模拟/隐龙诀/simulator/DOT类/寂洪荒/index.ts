import 通用DOT类 from '../../通用类/通用DOT类'

class 寂洪荒DOT extends 通用DOT类 {
  获得和刷新寂洪荒DOT() {
    const 当前最后一跳 =
      this.DOT运行数据?.待生效数据?.[this.DOT运行数据.待生效数据.length - 1] || {}
    const 当前层数 = 当前最后一跳?.当前层数 || 0
    const 最大层数 = this.获取当前DOT数据('寂洪荒DOT')?.最大层数 || 2
    const 新层数 = Math.min(当前层数 + 1, 最大层数)
    this.更新待生效数据(新层数, this.获取当前DOT数据('寂洪荒DOT'))
  }

  结算寂洪荒DOT伤害(事件时间 = this.模拟循环.当前时间) {
    const { 结算数组 } = this.结算并更新运行数据(事件时间)
    结算数组?.forEach((数据) => {
      const 层数 = 数据.当前层数 || 1
      if (数据.生效时间) {
        this.触发伤害行为('寂洪荒dot-3层', 1, [], 数据.生效时间, 层数)
      }
    })
  }
}

export default 寂洪荒DOT
