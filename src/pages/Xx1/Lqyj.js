import React, {PureComponent} from 'react';
import {connect} from 'dva';
import moment from 'moment';
import {Card, Form, message,} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TaroLibrary.less';


const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
/* eslint react/no-multi-comp:0 */
@connect(({rule, loading}) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
  };

  columns = [
    {
      title: '[id]',
      dataIndex: 'id',
      render: text => <span>{text}</span>,
    },
    {
      title: '[用户ID]',
      dataIndex: 'unameId',
    },
    {
      title: '[内容]',
      dataIndex: 'lqyjContent',
    },

    {
      title: '发送时间',
      dataIndex: 'lqyjTime',
      // sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'rule/queryLqyjList',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
  };
  handleAdd = fields => {
    const {dispatch} = this.props;
    dispatch({
      type: 'rule/add',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const {dispatch} = this.props;
    const {formValues} = this.state;
    dispatch({
      type: 'rule/update',
      payload: {
        query: formValues,
        body: {
          name: fields.name,
          desc: fields.desc,
          key: fields.key,
        },
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };


  render() {
    const {
      rule: {data},
      loading,
    } = this.props;
    console.log(data)
    const {selectedRows, } = this.state;


    return (
      <PageHeaderWrapper title="留言列表">
        <Card bordered={false}>
          <div className={styles.tableList}>

            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;

