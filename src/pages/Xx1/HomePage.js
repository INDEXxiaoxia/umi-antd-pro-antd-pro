import React, {Component, Suspense} from 'react';
import {connect} from 'dva';
import {Row, Col, Icon, Menu, Dropdown} from 'antd';
import {select30DaysNumber, selectZoneNumber} from "../../services/api";


class ShowPage extends Component {
    state={
      iframeSRC:'http://www.indexxiaoxia.xyz:9090/index/goods?proID=1&i=1'
    };
  render() {
    return (
      <div>
        <button onclick={window.open('https://www.indexxiaoxia.xyz', '_self')}>前往主页</button>
        <iframe
          src={this.state.iframeSRC}
          width={'100%'}
          height={'1150px'}
          frameBorder="0"
          scrolling={'auto'}
        />
      </div>)

  }
}

export default ShowPage;
