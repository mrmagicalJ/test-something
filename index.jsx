
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Select, Divider, Form, Input, Row, Col, InputNumber, Checkbox } from 'antd';
import styles from './style.less';
import FactorySeries from '../FactorySeries';
import AudioTags from '../AudioTags';
import Point from '../Point';
import Upload from './upload';
import ImportLineModal from './importLineModal';
import FactorySelect from '@/components/FactorySelect';
import UserStoreSelect from '../../QueryBox/UserStoreSelect';
import services from '@/services';
import {GetQueryString, GetRole} from '@/utils/tool';
import { FatherContext } from '../../createContext';
const {line} = services;
const { Option } = Select;
/* eslint-disable */
export default function Index(props) {
    let loginUserRole = '';
    const href = window.location.href;
    // 是否来源于新零售，true: 则factoryId从车系接口获取， false: 从地址获取
    const isNewSell = href.indexOf('newSell') !== -1;
    const dealName = GetQueryString('dealerName', href);
    const dealId = GetQueryString('dealerId', href);
    const [dealerName, setDealerName] = useState(dealName);
    const [dealerId, setDealerId] = useState(dealId);
    const [deptId, setDeptId] = useState('');
    const [factoryIdObj, setFactoryIdObj] = useState({});
    if (!isNewSell) {
      loginUserRole = GetRole();
    } else {
      loginUserRole = 'AUTOHOME';
    }

    const { form, editNow, setDealerObj, isFromDealer } = props;
    const [allSeriesList, setAllSeriesList] = useState(null);
    const [seriesList, setSeriesList] = useState(null);
    const [editData, setEditData] = useState(editNow);
    const [userRole, setUserRole] = useState(loginUserRole);
    const [factoryId, setFactoryId] = useState('');
    const [factoryName, setFactoryName] = useState('');
    // 欢迎欢送语
    const [audioTag, setAudioTag] = useState([]);
    const initWelcomeAudioTag = (seriesList = []) => {
        return [
            {
                canUseList: seriesList,
                estTextPlayTime: 0,
                series: [],
                text: '',
                type: 1
            },
            {
                canUseList: seriesList,
                estTextPlayTime: 0,
                series: [],
                text: '',
                type: 2
            }
        ]
    };
    useEffect(() => {
        setEditData({...editNow});
        if (!editNow) {
          return;
        }
        const { factoryId, factoryName, dealerId, dealerName, deptId } = editNow;
        if (factoryId) {
          setFactoryId(factoryId);
          setFactoryIdObj({factoryId: factoryId, tenantId: factoryId});
        }
        if (factoryName) {
          setFactoryName(factoryName);
        }
        if (dealerId) {
          setDealerId(dealerId);
        }
        if (dealerName) {
          setDealerName(dealerName);
        }
        if (deptId) {
            setDeptId(deptId);
        }
    }, [editNow]);
    useEffect(() => {
        if (factoryId && !isNewSell) {
            getSeriesList(factoryId);
        }
    }, [factoryId])
    useEffect(() => {
        if (isNewSell) {
            getSeriesList();
        }
        if (isFromDealer) {
            const id = GetQueryString('factoryId', href);
            const name = GetQueryString('factoryName', href);
            setFactoryId(id);
            setFactoryName(name);
            form.setFieldsValue({dealerName});
        }
    }, [])
     // 点
    const [waypoint, setWayPoint] = useState([]);
    const audioTagChange=(arr)=>{
        setAudioTag(arr);
        form.setFieldsValue({audioTag: arr});
    }
    // 获取车系列表
    const getSeriesList = async (factoryId) => {
        // 新零售接口处理
        const res = !isNewSell ? await line.getSerList({factoryId}) : await line.getNewSellSeries({
            tenantId: GetQueryString('tenantId', href),
            storeId: dealerId
        });
        if (res.returncode !== 0) {
            return;
        }
        const series = res.result;
        if(!form.getFieldValue("seriesIds") && series.length){
            form.setFieldsValue({seriesIds: [series[0].seriesId]});
        }
        let seriesList = [];
        if (editData && editData.seriesIds && editData.seriesIds.length) {

            seriesList = series.filter(s=>{
                return editData.seriesIds.includes(s.seriesId)
            });
            if (isNewSell) {
                setFactoryId(seriesList[0].factoryId);
                setFactoryName(seriesList[0].factoryName);
            }
        } else {
            if (series.length) {
                seriesList = [series[0]];
                if (isNewSell) {
                    setFactoryId(seriesList[0].factoryId);
                    setFactoryName(seriesList[0].factoryName);
                }
            }
        }
        setSeriesList(seriesList);
        setAllSeriesList(series);
    }
    const pointChange = (arr) => {
        setWayPoint(arr);
        form.setFieldsValue({waypoint: arr.map(d=>({...d,active:false}))});
    }
    useEffect(()=>{
        if(editData){
            const initAudioTag = initWelcomeAudioTag(seriesList);
            const len = editData.audioTag ? editData.audioTag.length : 0
            if (len === 0) {
              editData.audioTag = initAudioTag;
            } else if (len === 1) {
              editData.audioTag = [...editData.audioTag, {
                canUseList: seriesList,
                estTextPlayTime: 0,
                series: [],
                text: '',
                type: editData.audioTag[0].type === 1 ? 2 : 1
              }]
            }
            setAudioTag(editData.audioTag);
            setWayPoint(editData.waypoint||[]);
        }
    }, [editData]);
   const factorySeriesChange =(newSer)=>{
        const series = allSeriesList.filter(d=>newSer.includes(d.seriesId))
        setSeriesList(series);
        // 新零售获取factoryId
        if (isNewSell) {
            setFactoryId(series[0].factoryId);
            setFactoryName(series[0].factoryName);
        }
        form.setFieldsValue({seriesIds: [series[0].seriesId]});
   }
    useEffect(() => {
        if (!editData) {
            const newAudioTag = audioTag.filter(item => item.type !== 1 && item.type !== 2);
            const initAudioTag = initWelcomeAudioTag(seriesList);
            setAudioTag([
                ...newAudioTag,
                ...initAudioTag
            ]);

        }
    }, [seriesList, editData]);

    const onChangeLine = (lineData) => {
        if (editNow && editNow.id) {
            lineData.id = editNow.id;
        } else {
            delete lineData.id;
        }
        setEditData({...lineData});
        form.setFieldsValue({...lineData, length: lineData.length/1000, estimateTime:lineData.estimateTime / 60});
    }
    const triggerChange = (key, obj, extra) => {
        if (key === 'factoryId') {
            setFactoryId(obj.factoryId);
            setFactoryName(obj.factoryName);
            setFactoryIdObj({factoryId: obj.factoryId, tenantId: extra.tenantId});
            form.setFieldsValue({seriesIds: ''});
        } else if (key === 'deptId') {
            setDealerObj({
                ...obj,
                factoryId
            });
            setDealerName(obj.dealerName);
            setDealerId(obj.dealerId);
            setDeptId(obj.deptId);
        }
        form.setFieldsValue({...obj});
    }
    return (
        <>
        <Form
            form={form}
            preserve={false}
            labelAlign={'right'}
            className="ant-advanced-search-form"
        >
            <Row gutter={24}>
                {
                  !isNewSell && !isFromDealer && <Col span={8}>
                      <Form.Item
                          label="厂商:"
                          validateTrigger={['onBlur', 'onChange']}
                          name="factoryId"
                          rules={[
                              {
                                  required: true,
                                  message: '请选择厂商'
                              }
                          ]}
                      >
                          <FactorySelect value={editData ? editData.factoryId : ''} onChange={(factoryId, factoryName, extra)=>{triggerChange('factoryId', {factoryId, factoryName}, extra)}} disabled={editNow && editNow.factoryId ? true : false}></FactorySelect>
                      </Form.Item>
                  </Col>
                }
                <Col span={8}>
                    <Form.Item
                        label="门店:"
                        validateTrigger={['onBlur', 'onChange']}
                        name={(editNow || isNewSell || isFromDealer) ? 'dealerName' : 'deptId'}
                        rules={[
                            {
                                required: true,
                                message: '请选择门店'
                            }
                        ]}
                    >
                      {
                        editNow || isNewSell || isFromDealer ?
                        <Input disabled></Input>:
                        <UserStoreSelect onChange={(deptId, dealerName, cityId, cityName, dealerId) => {triggerChange('deptId', {deptId, dealerId, dealerName, cityId, cityName})}} storeParams={factoryIdObj} disabled={(!factoryId || (factoryId && editNow)) ? true : false} />
                      }
                    </Form.Item>
                </Col>
            </Row>
            <div className={styles.title}>
                <span>试驾路线</span>
                { allSeriesList && dealerId && <ImportLineModal deptId={deptId} factoryName={factoryName} dealerId={dealerId} dealerName={dealerName} onChangeLine={onChangeLine} style={{marginLeft: '30px'}} allSeriesList={allSeriesList} /> }
            </div>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        label="线路名称:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入线路名称'
                            }
                        ]}
                    >
                        <Input></Input>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="线路状态:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: '请选择线路状态'
                            }
                        ]}
                    >
                        <Select>
                            <Select.Option value={1}>
                                启用
                            </Select.Option>
                            <Select.Option value={0}>
                                停用
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="线路距离:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="length"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (value === 0) {
                                        return Promise.reject(new Error('线路距离不能为0'))
                                    }
                                    if (!value) {
                                        return Promise.reject(new Error('请输入线路距离'))
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber addonAfter="KM" controls={false}></InputNumber>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        label="预计用时:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="estimateTime"
                        rules={[
                            {
                                validator: (_, value) => {
                                    if (value === 0) {
                                        return Promise.reject(new Error('预计用时不能为0'))
                                    }
                                    if (!value) {
                                        return Promise.reject(new Error('请输入预计用时'))
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber addonAfter="分" controls={false}></InputNumber>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label="适用顾客类型:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="clientType"
                        rules={[
                            {
                                required: true,
                                message: '请输入顾客类型'
                            }
                        ]}
                    >
                        <Input maxLength={10}></Input>
                    </Form.Item>
                </Col>
                { userRole === 'AUTOHOME' &&
                  <Col span={8}>
                      <Form.Item
                          valuePropName="checked"
                          name="simulateCheck">
                          <Checkbox>添加模拟导航</Checkbox>
                      </Form.Item>
                  </Col>
                }
            </Row>

            <Row gutter={24}>
                <Col span={24} >
                    <Form.Item
                        label="适用车系:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="seriesIds"
                        rules={[
                            {
                                required: true,
                                message: '请输入适用车系:'
                            }
                        ]}
                    >
                        <>
                            {
                                allSeriesList &&
                                <FactorySeries
                                    onChange={factorySeriesChange}
                                    seriesList={allSeriesList}
                                    value={form.getFieldValue('seriesIds')}
                                    multiple={false}
                                />
                            }
                        </>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={24}>
                <Col span={24} >
                    <Form.Item
                        label="线路描述:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="description"
                    >
                        <Input maxLength={30}></Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24} >
                    <Form.Item
                        label="线路首图:"
                        validateTrigger={['onBlur', 'onChange']}
                        name="thumbnail"
                        rules={[
                            {
                                required: true,
                                message: '请选择线路首图:'
                            }
                        ]}
                    >
                        <Upload onChange={(url)=>{form.setFieldsValue('thumbnail',url)}}></Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label=""
                hidden
                validateTrigger={['onBlur', 'onChange']}
                name="id"
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                label=""
                hidden
                validateTrigger={['onBlur', 'onChange']}
                name="audioTag"
            >
                <Input></Input>
            </Form.Item>
            <Form.Item
                label=""
                hidden
                validateTrigger={['onBlur', 'onChange']}
                name="waypoint"
            >
                <Input></Input>
            </Form.Item>

        </Form>
        <Divider></Divider>
        <div className={styles.welcome}>
            {seriesList  &&
                <FatherContext.Provider value={{factoryId, factoryName}}>
                    <AudioTags onChange={audioTagChange} value={audioTag} seriesList={seriesList}></AudioTags>
                </FatherContext.Provider>
            }
        </div>
        <Divider></Divider>
        <div className={styles.linesDraw}>
            <div className={styles.lineTitle}>
                <span className={styles.leftTitle}>绘制试驾线路: <span className={styles.rightTitle}>总点位数 {waypoint.length}（规划点{waypoint.filter(d=>d.type==2).length}个、体验点{waypoint.filter(d=>d.type==3).length}个)</span></span>
                <span className={styles.mapTitle}>点击右键添途经点，拖动点位可以改变路线</span>
            </div>
            {seriesList  &&
                <FatherContext.Provider value={{factoryId, factoryName}}>
                    <Point onChange={pointChange} value={waypoint} seriesList={seriesList}></Point>
                </FatherContext.Provider>
            }
        </div>

        </>
    )
}
