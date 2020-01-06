import { queryRule, removeRule, updateRule } from '@/services/api';
// import {queryTaroLibrary} from "../../../services/api";
import {queryLqyjList,select30DaysNumber,queryTaroLibrary} from "../../../services/api";

export default {
  namespace: 'rule',

  state: {
    MyData:null,
    data: {
      list: [],
      pagination: {},
    },
    visitNumberList:[],
    ZoneVisitNumber:null,
  },

  effects: {
    *queryTaroLibrary({ payload }, { call, put }) {
      const response = yield call(queryTaroLibrary, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *queryLqyjList({ payload }, { call, put }) {
      const response = yield call(queryLqyjList, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *select30DaysNumber({ payload }, { call, put }) {
      const response = yield call(select30DaysNumber, payload);
      yield put({
        type: 'save1',
        payload: response,
      });
      // return  response;

    },
    *selectZoneNumber({ payload }, { call, put }) {
      const response = yield call(selectZoneNumber, payload);
      yield put({
        type: 'save2',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

    save1(state, action) {
      return {
        ...state,
        visitNumberList: action.payload,
      };
    },
    save2(state, action) {
      return {
        ...state,
        ZoneVisitNumber: action.payload,
      };
    },
  },

};
