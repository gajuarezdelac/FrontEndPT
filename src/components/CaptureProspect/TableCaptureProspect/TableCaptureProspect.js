import React, { useState } from 'react';
import { Row,Col,Table,Space } from 'antd';
import { EyeOutlined,PlusCircleOutlined } from '@ant-design/icons';

function TableCaptureProspect(props) {

    const {data} = props;

    const columns = [
      {
        title: 'Nombre',
        width: 200,
        dataIndex: 'nombre',
        key: 'nombre'
      },
      {
        title: 'Primer Apellido',
        width: 150,
        dataIndex: 'primerApellido',
        key: 'primerApellido',
      },
      
      {
        title: 'Segundo Apellido',
        width: 150,
        dataIndex: 'segundoApellido',
        key: 'segundoApellido',
      },
      { title: 'Estatus', dataIndex: 'estatus', key: 'estatus' },
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => (
          <Space size="middle">
              <EyeOutlined  onClick={() => props.showModalView(record._id)} />
              <PlusCircleOutlined  onClick={props.showModalCreate} />
          </Space>
      ),
      },
    ];

     
    
  
    
    
      return (
        <Row>
           <Row align="space-around" style={{ padding: '10px 0px' }}>
           </Row>
           <Row align="center">
          <Col span={22}>
          <Table columns={columns} dataSource={data} scroll={{ y: 400 }}  />
          </Col>
        </Row>
     </Row>
      );
    }
    
    export default TableCaptureProspect;