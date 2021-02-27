import React, { useState } from 'react';
import { Modal,Descriptions, Badge} from 'antd';


const ModalViewProspect = (props) => {

  const {data} = props;

    return (
      <>
        <Modal
          title="Definir Prospecto"
          visible={props.visibleModalView}
          // onOk={props.onCloseModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={props.onCloseModalView}
          width={900}
          style={{ top: 20 }}

        >
    <Descriptions bordered>
    <Descriptions.Item label="Nombre:">{data.nombre}</Descriptions.Item>
    <Descriptions.Item label="Primer apellido:">{data.primerApellido}</Descriptions.Item>
    <Descriptions.Item label="Segundo apellido:"> {data.segundoApellido} </Descriptions.Item>
    <Descriptions.Item label="Numero:">{data.numeroCasa}</Descriptions.Item>
    <Descriptions.Item label="Calle:" span={2}>
    {data.calle}
    </Descriptions.Item>
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text={data.estatus} />
    </Descriptions.Item>
    <Descriptions.Item label="Código Postal:">{data.codigoPostal}</Descriptions.Item>
    <Descriptions.Item label="Colonia:" span={2}>
    {data.colonia}
    </Descriptions.Item>
    
    <Descriptions.Item label="RFC:">{data.rfc}</Descriptions.Item>
    <Descriptions.Item label="Código Postal:">{data.codigoPostal}</Descriptions.Item>
    <Descriptions.Item label="Telefono:">{data.telefono}</Descriptions.Item>
    <Descriptions.Item label="Documentos" span={3}>
      <ul>
        <li><a href="http://" target="_blank">Archivo 1</a></li>
        <li><a href="http://">Archivo 2</a></li>
        <li><a href="http://">Archivo 3</a></li>
      </ul>
    </Descriptions.Item>
    <Descriptions.Item label="Observaciones">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
     when an unknown printer took a galley of type and scrambled it to make a type 
    </Descriptions.Item>
  </Descriptions>
        </Modal>
      </>
    );
  };


export default ModalViewProspect;