import constant from './constant'

export default {
    install (Vue, $i18n) {
        Vue.prototype.$c = constant
    }
}