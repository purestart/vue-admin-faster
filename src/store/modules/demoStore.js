/**
 * Created by tanyichao on 2017/3/17.
 */
const state = {
    isTitle:false,
    //是否有稍后日期选择
    diningModeType:false,
}
const mutations = {
    updateIsTitle (state, payload) {
        state.isTitle = payload.isTitle
    },
    updateDiningModeType (state, payload) {
        state.diningModeType = payload.diningModeType
    },
}
const actions = {
    updateIsTitle ({commit},isTitle) {
        commit({type: 'updateIsTitle', isTitle: isTitle})
    },
    updateDiningModeType ({commit},diningModeType) {
        commit({type: 'updateDiningModeType', diningModeType: diningModeType})
    },
}

export default {
    state,
    actions,
    mutations
}
