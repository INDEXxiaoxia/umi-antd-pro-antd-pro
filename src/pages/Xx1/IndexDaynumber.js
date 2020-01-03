import React, {Component, Suspense} from 'react';
import {connect} from 'dva';
import {Row, Col, Icon, Menu, Dropdown} from 'antd';
import styles from './IndexDaynumber.less';
import G2 from '@antv/g2';
import {select30DaysNumber} from "../../services/api";
import PageLoading from '@/components/PageLoading';

class ShowNumberBox extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    daynumberList: select30DaysNumber(),
  };

  queryDaynumber() {
    const {dispatch} = this.props;
    dispatch({
      type: 'rule/select30DaysNumber',
    });
  }

  render() {
    const daynumberList = this.state.daynumberList;
    return (
      <div>
        <h6>TestDaynumberList</h6>
        <span>{daynumberList}</span>
      </div>)

  }
}

export default ShowNumberBox;
