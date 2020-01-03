import { queryBasicProfile, queryAdvancedProfile } from '@/services/api';

export default {
  /**
   * 该字段就相当于model的索引，
   * 根据该命名空间就可以找到页面对应的model。
   * 注意 namespace 必须唯一。
   */
  namespace: 'profile',
  /**
   * state 是储存数据的地方，收到 Action 以后，会更新数据。
   */
  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },
  /**
   * 处理所有的异步逻辑，将返回结果以Action的形式交给reducer处理。
   */
  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(queryBasicProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  /**
   * 处理所有的同步逻辑，将数据返回给页面。
   */
  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
