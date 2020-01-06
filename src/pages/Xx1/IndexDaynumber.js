import React, {PureComponent,} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Card, Form, message, InputNumber,} from 'antd';
import styles from './IndexDaynumber.less';
import G2 from '@antv/g2';
import $ from  'jquery'
// import G2 from '@antv/g2/build/g2';
import {select30DaysNumber, selectZoneNumber} from "../../services/api";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({rule, loading}) => ({
  rule,
  loading: loading.models.rule,
  visitNumberList: rule.visitNumberList,
  ZoneVisitNumber: rule.ZoneVisitNumber,
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
      days: 30,
    };
  }

  componentWillUnmount() {
    console.log("页面渲染前调用")
  }

  //页面渲染后调用
  componentDidMount() {
    selectZoneNumber().then(x => {
      // 查询总访问量
      this.setState({ZoneNumber: x})
    });

    // 查询 state。days 天数内的访问量列表 更新state 构造图表
    select30DaysNumber(this.state.days).then(x => {
      this.setState({dayNumberList: x});
      // 构造图表
      this.tableMake();
    });

    // const {dispatch} = this.props;
    // dispatch({
    //   type: 'rule/select30DaysNumber',
    //   days: 5
    // });
  }

  //当输入框值改变时调用
  inputchanger() {
    // 从输入框获取 days
    let days = $("input[name='days']").val();
    console.log(days);
    this.setState({days: days});
    // 查询 state.days 天数内的访问量列表 更新state 构造图表
    select30DaysNumber(days).then(x => {
      this.setState({dayNumberList: x});
      // 构造图表
      this.tableMake();
    });
  }

  // 获取数据 整理数据 构造图表
  tableMake() {
    //清空图表div
    $("#tableBox").empty();
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
    numberChart.axis("访问量", {
      offset: 60,
      title: "访问量",
      // 设置标题的文本样式
      textStyle: {
        textAlign: 'left', // 文本对齐方向，可取值为： start middle end
        rotate: 0, // 文本旋转角度，以角度为单位，仅当 autoRotate 为 false 时生效
        fill: 'black', // 文本的颜色
      },
      position: 'end'
    });
    this.setState({numberChart: numberChart});
    numberChart.point().position('日期*访问量').shape('circle').size(4).style({
      stroke: '#fffafe',
      lineWidth: 2,
      fillOpacity: 4
    });
    numberChart.line().position('日期*访问量').size(2);
    numberChart.render();
  }


  render() {
    console.log("调用render()进行渲染");
    const {ZoneNumber, pageTitle} = this.state;
    return (
      <PageHeaderWrapper title={pageTitle}>
        <Card bordered={false}>
          <div>
            <h3>总访问量:{ZoneNumber}</h3>
            <hr/>
            <label>统计天数:</label>
            <InputNumber type={"number"} className={styles.MyInput} name={"days"} onChange={() => this.inputchanger()} placeholder={30}/>
            <button className={styles.MyBtn} onClick={() => this.tableMake()}>this.tableMake()</button>
            <div id="tableBox"></div>
          </div>
        </Card>
      </PageHeaderWrapper>
    )

  }
}

export default ShowNumberBox;
