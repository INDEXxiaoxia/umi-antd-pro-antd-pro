import React, {PureComponent,} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Card, Form, message,} from 'antd';
import styles from './IndexDaynumber.less';
import G2 from '@antv/g2';
// import G2 from '@antv/g2/build/g2';
import {select30DaysNumber, selectZoneNumber} from "../../services/api";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({rule, loading}) => ({
  rule,
  loading: loading.models.rule,
}))
class ShowNumberBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      salesType: 'all',
      currentTabKey: '',
      pageTitle: '网站访问量统计',
      dayNumberList: [],
      ZoneNumber: null,
      numberChart: null,
    };
  }

  componentWillUnmount() {
    console.log("页面渲染前调用")

  }

  componentDidMount() {
    selectZoneNumber().then(x => this.setState({ZoneNumber: x}));
    select30DaysNumber().then(x => this.setState({dayNumberList: x}));
    // this.tableMake();

    // const {dispatch} = this.props;
    // dispatch({
    //   type: 'rule/select30DaysNumber',
    //   days: 5
    // });
  }

  tableMake() {
    document.getElementById("tableBox").innerHTML="";
    const data = this.state.dayNumberList;
    let dataToShow = []; //定义数组存放整理后的
    data.forEach(item => {
      dataToShow.push({
        "访问量": item.count,
        "日期": moment(item.day).format('MM-DD'),
      })
    });
    dataToShow.reverse();
    console.log("整理前后的数组:");
    console.log(data);
    console.log(dataToShow);
    const numberChart = new G2.Chart({
      container: 'tableBox',
      forceFit: true,
      width: 1000,
      height: 500,
      padding: [20, 20, 95, 80],
    });
    numberChart.source(dataToShow, {
      "日期": {
        nice: false,
      },
      "访问量": {
        formatter: x => x + '次',
      },
    });
    this.setState({numberChart: numberChart});
    console.log("tableMake被调用");
    numberChart.line().position('日期*访问量').size(2);
    numberChart.render();
  }

  render() {
    const {ZoneNumber, dayNumberList, pageTitle} = this.state;
    // const {
    //   rule: {visitNumber},
    //   loading,
    // } = this.props;
    // console.log(visitNumber);
    console.log("ZoneNumber:" + ZoneNumber);
    console.log(this.state);
    return (

      <PageHeaderWrapper title={pageTitle}>
        <Card bordered={false}>
          <div>
            <button className={styles.MyBtn} onClick={() => this.tableMake()}>this.tableMake()</button>
            <div id="tableBox"></div>
          </div>
        </Card>
      </PageHeaderWrapper>
    )

  }
}

export default ShowNumberBox;
