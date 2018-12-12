

export default class Utils {
  /**
   * 通过传入的children字段名，将多层级的对象打平为一个数组
   * @param {T} source
   * @param {string} children
   * @returns {T[]}
   * 例如  [{id: 1, children: [{id: 2}]}] => [{id: 1}, {id: 2}]
   */
  flatObject (source, children = 'children') {
    const re = []
    const clone = JSON.parse(JSON.stringify(source))
    this.flatObjectDo(clone, children, re)
    return re
  }

  /**
   * 数组转树
   * @param source
   * @param parentIdVal
   * @param id
   * @param parentId
   * @returns {*}
   */
  list2Tree (source, parentIdVal = undefined, id = 'id', parentId = 'parentId') {
    const target = source.filter((s) => s[parentId] === parentIdVal)
    target.forEach((t) => {
      const children = this.list2Tree(source, t[id], id, parentId)
      if (children.length) {
        t.children = children
      }
    })
    return target
  }

  // 日期判断
  isDate (obj) {
    return Object.prototype.toString.call(obj) === '[object Date]'
  }
  isObj (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }
  // 空对象判断
  isEmptyObject (obj) {
    return Object.keys(obj).length <= 0
  }
  //
  delEmptyProp (obj = {}) {
    for (const key of Object.keys(obj)) {
      if (this.isObj(obj[key])) {
        this.delEmptyProp(obj[key])
      }
      if (obj[key] === null || obj[key] === undefined || obj[key] === '' || (this.isObj(obj[key]) && this.isEmptyObject(obj[key]))) {
        delete obj[key]
      }
    }
    return obj
  }
  // 对象转为数组
  objToArr (obj = {}, labelField = 'label', valueField = 'value') {
    const arr = []
    for (const key of Object.keys(obj)) {
      arr.push({ [labelField]: key, [valueField]: obj[key] })
    }
    return arr
  }

  // 反转对象的key-value
  reverse (source) {
    const re = {}
    for (const key of Object.keys(source)) {
      re[source[key]] = key
    }
    return re
  }

  flatObjectDo (source, children, re, parentId) {
    source.forEach((s) => {
      if (parentId) {
        s.parentId = parentId
      }
      re.push(s)
      if (s[children]) {
        this.flatObjectDo(s[children], children, re, s.id)
        delete s[children]
      }
    })
  }
}
export const utils = new Utils()
