import React, { useState,useEffect } from 'react';
import TableCaptureProspect from './TableCaptureProspect/TableCaptureProspect';
import ModalCaptureProspect from './ModalCaptureProspect/ModalCaptureProspect';
import ModalViewProspect from './ModalViewProspect/ModalViewProspect';
import { Col,Row,Button,Spin,Form,Input,Drawer,message,Modal,Space,Table } from 'antd';
import { PlusOutlined,EyeOutlined ,PlusCircleOutlined} from '@ant-design/icons';
import Axios from 'axios';
import './CaptureProspect.css'

const { TextArea } = Input;


function CaptureProspect() {
  
  const baseUrl = 'http://localhost:8080/api/prospectos/';

  // Modals
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [visibleModalView, setVisibleModalView] = useState(false)
  const [visibleSpin, setVisibleSpin] = useState(true)
  const [prospectos, setProspectos] = useState([])

  const [nombre,setNombre] = useState('');
  const [primerApellido,setPrimerApellido] = useState('');
  const [segundoApellido,setSegundoApellido] = useState('');
  const [calle,setCalle] = useState('');
  const [numeroCasa,setNumeroCasa] = useState('');
  const [colonia,setColonia] = useState('');
  const [codigoPostal,setCodigoPostal] = useState('');
  const [telefono,setTelefono] = useState('');
  const [rfc,setRFC] = useState('');
  const [files,setFiles] = useState({});

  // Form

  const [prospectoSeleccionado, SetProspectoSeleccionado]=useState({
    id: '',
    nombre: '',
    primerApellido:'',
    segundoApellido: '',
    calle: '',
    numeroCasa: '',
    colonia: '',
    codigoPostal: '',
    telefono: '',
    rfc: '',
    estatus: '',
    observaciones: ''
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    SetProspectoSeleccionado({...prospectoSeleccionado,
    [name]: value});
  }
 
  const seleccionarConsola=(consola, caso)=>{
    SetProspectoSeleccionado(consola);
    console.log(consola);
    (caso=='Editar')?showModalCreate() : showModalView();
  }

  // Table 

  
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
      render: (record) => (
        <Space size="middle">
            <EyeOutlined  onClick={() => seleccionarConsola(record,"Ver")} />
            <PlusCircleOutlined  onClick={() => seleccionarConsola(record,"Editar")} />
        </Space>
    ),
    },
  ];
  
  const showModalCreate = () => setVisibleModal(true)   
  const onCloseModal =  () => setVisibleModal(false)

  const showDrawerCreate = () => setVisibleDrawer(true)   
  const onCloseDrawer =  () => setVisibleDrawer(false)

  const showModalView = () => setVisibleModalView(true)   
  const onCloseModalView =  () => setVisibleModalView(false)

  const onFinish = () => {
    addProspectoPost()
    obtenerProspectos();
    onCloseDrawer();
    success();
  }
   
  const onFinishUpdate = () => {
    peticionPut();
    obtenerProspectos();
    onCloseModal();
    success();
  }
  

  
  

  const success = () => {
    message.success('Se agrego correctamente el registro');
  };

  React.useEffect(() => {
    obtenerProspectos()
  },[])

  const obtenerProspectos = async () => {
    await Axios.get(baseUrl)
    .then(response => {
      setProspectos(response.data.registros)
    }).catch(error => {
      console.error(error)
    })
    setVisibleSpin(false)
  }

  const addProspectoPost = event => {
    const data  = new FormData()
    data.append("nombre",nombre);
    data.append("primerApellido",primerApellido);
    data.append("segundoApellido",segundoApellido);
    data.append("calle",calle);
    data.append("numeroCasa",parseInt(numeroCasa, 10));
    data.append("colonia",colonia);
    data.append("codigoPostal",parseInt(codigoPostal, 10));
    data.append("telefono",parseInt(telefono, 10));
    data.append("rfc",rfc);
    data.append("files",files);
    Axios.post(baseUrl,data).
    then(res => setProspectos(data.concat(res.data))).catch(err => console.log(err))
  }



  const peticionPut=async()=>{
    await Axios.put(baseUrl+prospectoSeleccionado._id, prospectoSeleccionado)
    .then(response=>{
      var dataAuxiliar = prospectos;
      dataAuxiliar.map(elemento=>{
        if(prospectoSeleccionado._id===elemento._id){
          elemento.nombre = prospectoSeleccionado.nombre;
          elemento.primerApellido=prospectoSeleccionado.primerApellido;
          elemento.segundoApellido=prospectoSeleccionado.segundoApellido;
          elemento.estatus=prospectoSeleccionado.estatus;
        }
      });
      setProspectos(dataAuxiliar);    
    }).catch(error=>{
      console.log(error);
    })
      }


  
  return (
    <Spin size="small" spinning={visibleSpin}>
    <Col span={24}>
       <Row gutter={[16, 48]}>
        <Col span={12}>
        <Button type="primary" onClick={showDrawerCreate}>
         <PlusOutlined/> Agregar Prospecto 
        </Button>
        </Col>
      </Row>

       {/* Tabla */}

       <Row>
           <Row align="space-around" style={{ padding: '10px 0px' }}>
           </Row>
           <Row align="center">
          <Col span={22}>
          <Table columns={columns} dataSource={prospectos} scroll={{ y: 400 }}  />
          </Col>
        </Row>
     </Row>


       {/* Editar */}
       
       <Modal
          title="Definir Prospecto"
          visible={visibleModal}
          // onOk={props.onCloseModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={onCloseModal}
          width={500}
          style={{ top: 40 }}
          destroyOnClose={true}
        >
              <Form layout="vertical" onFinish={onFinishUpdate}>
              <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nombre del prospecto"
                >
                  <Input type="text" name="nombre" onChange={handleChange} disabled placeholder={prospectoSeleccionado.nombre}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Primer Apellido"
                >
                 <Input name="primerApellido" onChange={handleChange} disabled placeholder={prospectoSeleccionado.primerApellido}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="segundoApellido"
                  label="Segundo Apellido"
                >
                   <Input onChange={handleChange} disabled  placeholder={prospectoSeleccionado.segundoApellido}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="numeroCasa"
                  label="Número"
                >
                   <Input  type="number" onChange={handleChange} disabled placeholder={prospectoSeleccionado.numeroCasa}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="colonia"
                  label="Colonia"
                >
                     <Input onChange={handleChange} disabled placeholder={prospectoSeleccionado.colonia} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="codigoPostal"
                  label="Código Postal"
                >
                    <Input  type="number" onChange={handleChange} disabled  placeholder={prospectoSeleccionado.codigoPostal}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="telefono"
                  label="Teléfono"
                  
                >
                  <Input type="number" onChange={handleChange} disabled placeholder={prospectoSeleccionado.telefono}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="rfc"
                  label="RFC"
                >
                  <Input onChange={handleChange} disabled placeholder={prospectoSeleccionado.rfc}/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Estatus"
                >       
               <div className="select-container">
               </div>
               
               <select name="estatus" onChange={handleChange} id="cars">
               <option value="" selected disabled hidden>Defina el estatus</option>
               <option value="Rechazado">Rechazar</option>
               <option value="Autorizado">Autorizar</option>
               </select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="observaciones"
                  label="Observaciones"
                  rules={[{ required: true, message: 'Es necesario las observaciones' }]}
                >
                  <TextArea name="observaciones" rows={2} onChange={handleChange}  placeholder="Ingrese sus observaciones" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
              <Button type="primary" onClick={() => onCloseModal()}  danger block>
               Volver atras 
              </Button>
              </Col>
              <Col span={12}>
              <Button type="primary" htmlType="submit" block onClick={() => peticionPut()}>Cotinuar</Button>,
              </Col>
            </Row>  
 

          </Form> 
        </Modal>

       {/*  */}
       <Drawer
        title="Captura de PND"
        width={900}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
        destroyOnClose={true}
        bodyStyle={{ paddingBottom: 80 }}>
       <>
       <Form layout="vertical" onFinish={onFinish} hideRequiredMark>
       <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="nombre"
                  label="Nombre del prospecto"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" onChange={event => setNombre(event.target.value)} value={nombre} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="primerApellido"
                  label="Primer Apellido"
                  rules={[{ required: true, message: 'Please enter url' }]}
                >
                 <Input placeholder="Please enter user name" onChange={event => setPrimerApellido(event.target.value)} value={primerApellido}/>
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
                   <Input placeholder="Please enter user name" onChange={event => setSegundoApellido(event.target.value)} value={segundoApellido} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="numeroCasa"
                  label="Número"
                  rules={[{ required: true, message: 'Please choose the type' }]}
                >
                   <Input placeholder="Please enter user name" type="number" onChange={event => setNumeroCasa(event.target.value)} value={numeroCasa}/>
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
                     <Input placeholder="Please enter user name"  onChange={event => setColonia(event.target.value)} value={colonia}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="codigoPostal"
                  label="Código Postal"
                  rules={[{ required: true, message: 'Please choose the dateTime' }]}
                >
                    <Input placeholder="Please enter user name" type="number" onChange={event => setCodigoPostal(event.target.value)} value={codigoPostal}/>
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
                      message: 'Es necesario este campo!',
                    },
                  ]}
                >
                  <Input placeholder="Ingresa el número de telefono" type="number" onChange={event => setTelefono(event.target.value)} value={telefono}/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="calle"
                  label="Calle"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name" onChange={event => setCalle(event.target.value)} value={calle}/>
                </Form.Item>
              </Col>
            </Row>
            {/* Upload */}
            <Row gutter={16} align="middle">
              <Col span={12}>
              <Form.Item
                  name="rfc"
                  label="RFC"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input type="text" placeholder="Please enter user name" onChange={event => setRFC(event.target.value)} value={rfc}/>
                </Form.Item>
              </Col>
              <Col span={12}>
              <input maxCount={1} type="file" id="file"
              onChange={event => {
              const file = event.target.files[0];
              setFiles(file);
              }} 
              className="custom-file-upload"
              />
              </Col>
            </Row> 

            <Row gutter={16} align="center" >
             
              <Col span={12} >
              <Form.Item>
                 <Button size="large" type="primary" htmlType="submit"  block>Crear Prospecto</Button>
                </Form.Item>
              </Col>
            </Row> 
 
          </Form> 
    </>
    </Drawer>

       
       
       <ModalViewProspect visibleModalView={visibleModalView} data={prospectoSeleccionado} onCloseModalView={onCloseModalView}/>
       
      
    </Col>
    </Spin>
  );
}

export default CaptureProspect;
