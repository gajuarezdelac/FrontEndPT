import React, { useState,useEffect } from 'react';
import { Modal, Button,Form,Input,Row,Col } from 'antd';


const ModalCaptureProspect = (props) => {

   const [nombre,setNombre] = useState('');
   const [primerApellido,setPrimerApellido] = useState('');
   const [segundoApellido,setSegundoApellido] = useState('');
   const [calle,setCalle] = useState('');
   const [numero,setNumero] = useState('');
   const [colonia,setColonia] = useState('');
   const [codigoPostal,setCodigoPostal] = useState('');
   const [telefono,setTelefono] = useState('');
   const [rfc,setRFC] = useState('');
   const [files,setFiles] = useState();

   

    return (
      <>
        <Modal
          title="Definir Prospecto"
          visible={props.visibleModal}
          // onOk={props.onCloseModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={props.onCloseModal}
          width={500}
          style={{ top: 40 }}

        >
              <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nombre"
                  label="Nombre del prospecto"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="primerApellido"
                  label="Primer Apellido"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                 <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="segundoApellido"
                  label="Segundo Apellido"
                  rules={[{ required: true, message: 'Please select an owner' }]}
                >
                   <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="numeroCasa"
                  label="Número"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                   <Input placeholder="Please enter user name" type="number"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="colonia"
                  label="Colonia"
                  rules={[{ required: true, message: 'Please choose the approver' }]}
                >
                     <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="codigoPostal"
                  label="Código Postal"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                    <Input placeholder="Please enter user name" type="number"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="telefono"
                  label="Teléfono"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name" type="number"/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="RFC"
                  label="RFC"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name"/>
                </Form.Item>
              </Col>
            </Row>
            {/* Upload */}
            <Row gutter={16}>
              <Col span={12}>
              <Button type="primary" danger block>
              Rechazar
              </Button>
              </Col>
              <Col span={12}>
              <Button type="primary" block>
              Autorizar
              </Button>
              </Col>
            </Row> 
 

          </Form> 
        </Modal>
      </>
    );
  };


export default ModalCaptureProspect;