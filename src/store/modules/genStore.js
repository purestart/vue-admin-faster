/**
 * Created by tanyichao on 2017/3/17.
 */
import genApi from '../../api/gen'
const state = {
    dataBases:{pageNum:1,pageSize:10,total:0,list:[]},

}
const mutations = {
    updateDataBases (state, payload) {
        state.dataBases = payload
    },
    updateIsTitle (state, payload) {
        state.isTitle = payload.isTitle
    },
    updateDiningModeType (state, payload) {
        state.diningModeType = payload.diningModeType
    },
}
const actions = {
    fetchDbList({commit, dispatch}, payload = {pageNum: 1,pageSize:10}) {
        //api 请求
        let params={
            pageNum:payload.pageNum,
            pageSize:payload.pageSize,
            name:payload.name
        }
        console.log(payload);
        genApi.getDbList((res) => {
            console.log("success");
            console.log(res);
    
            commit('updateDataBases', res.data.data);
    
        }, err => {}, params)
    
        console.log("fetch course");
    
        //提交数据到mutation
    
        // dispatch action
        // dispatch('playAudio', initSecIndex);
    
    },
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
