import { useEffect, useState } from 'react';
import { Layout, Button, Typography, Row, Col, Card, Form, Input, Select, DatePicker, TimePicker, Modal, App as AntApp } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MaskedInput } from 'antd-mask-input';

import { useCriarChamado } from '../../hooks/useChamados';
import { useMotoristas } from '../../hooks/useMotoristas';
import { useGuinchos } from '../../hooks/useGuinchos';
import { useEnterToNavigate } from '../../hooks/useEnterToNavigate';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const ChamadoForm = () => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { notification } = AntApp.useApp(); // Pega a instância da notificação contextual

    const [isFormDirty, setIsFormDirty] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


    // Hooks de mutação e busca
    const { mutate: criarChamado, isPending: isSaving } = useCriarChamado();
    const { data: motoristas, isLoading: loadingMotoristas } = useMotoristas();
    const { data: guinchos, isLoading: loadingGuinchos } = useGuinchos();
    const handleKeyDown = useEnterToNavigate();

    // Lógica de verificação
    useEffect(() => {
        if (!loadingMotoristas && !loadingGuinchos) {
            const hasNoMotoristas = !motoristas || motoristas.length === 0;
            const hasNoGuinchos = !guinchos || guinchos.length === 0;

            if (hasNoMotoristas || hasNoGuinchos) {
                let description = '';
                if (hasNoMotoristas && hasNoGuinchos) {
                    description = 'É necessário cadastrar pelo menos um motorista e um guincho antes de criar um chamado.';
                } else if (hasNoMotoristas) {
                    description = 'É necessário cadastrar pelo menos um motorista antes de criar um chamado.';
                } else {
                    description = 'É necessário cadastrar pelo menos um guincho antes de criar um chamado.';
                }

                notification.warning({
                    message: 'Pré-requisitos Pendentes',
                    description: description,
                    duration: 0,
                    placement: 'topRight',
                });
                setIsSubmitDisabled(true);
            } else {
                setIsSubmitDisabled(false);
            }
        }
    }, [motoristas, guinchos, loadingMotoristas, loadingGuinchos, notification]);


    const handleFinish = (values) => {
        if (values.servico?.dataServico) {
            values.servico.dataServico = values.servico.dataServico.format('YYYY-MM-DD');
        }
        if (values.servico?.hora) {
            values.servico.hora = values.servico.hora.format('HH:mm:ss');
        }

        criarChamado(values, {
            onSuccess: () => {
                setIsFormDirty(false); // Para não mostrar o aviso de "descartar" após salvar
                navigate('/chamados');
            }
        });
    };

    const handleCepChange = async (event, tipoEndereco) => {

        const cep = event.target.value.replace(/\D/g, '');  // 1. Pega o valor do CEP e limpa (deixa só os números)
        if (cep.length !== 8) {   // 2. Se o CEP não tiver 8 dígitos, não faz nada
            return;
        }
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // 3. Se o CEP tem 8 dígitos, busca na API
            const data = await response.json();
            if (data.erro) {  // Se a API retornar um erro (CEP não encontrado)
                console.log("CEP não encontrado.");
                return;
            }

            if (tipoEndereco === 'origem') { // 4. Preenche os campos do formulário para Origem ou Destino
                form.setFieldsValue({
                    origem: {
                        cidade: data.localidade,
                        estado: data.uf,
                        bairro: data.bairro,
                        logradouro: data.logradouro,
                    }
                });
            } else if (tipoEndereco === 'destino') {
                form.setFieldsValue({
                    destino: {
                        cidade: data.localidade,
                        estado: data.uf,
                        bairro: data.bairro,
                        logradouro: data.logradouro,
                    }
                });
            }
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    // Função para lidar com o clique no botão "Voltar"
    const handleBackClick = () => {
        if (isFormDirty) {
            // Se o formulário estiver sujo, apenas mude o estado para ABRIR o modal
            setIsConfirmModalOpen(true);
        } else {
            // Se não estiver sujo, navega direto
            navigate('/dashboard');
        }
    };


    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Header style={{ background: '#fff', padding: '0 24px', height: 64, borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button type="link" icon={<LeftOutlined />} onClick={handleBackClick} style={{ marginRight: 16 }}>
                            Voltar
                        </Button>
                        <Title level={4} style={{ margin: 0 }}>
                            Novo Chamado
                        </Title>
                    </div>
                </div>
            </Header>

            <Content style={{ margin: 24, padding: 24, background: '#f0f2f5' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    onKeyDown={handleKeyDown}
                    onValuesChange={() => setIsFormDirty(true)}
                >
                    {/* Seção 1: Dados do Cliente */}
                    <Card style={{ marginBottom: 24 }} title={<Title level={4}>Dados do Cliente</Title>}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'nome']} label={<Text strong>Nome (Segurado)</Text>}>
                                    <Input placeholder="Nome completo" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'cpfCnpj']} label={<Text strong>CPF/CNPJ</Text>}>
                                    <MaskedInput
                                        mask={[
                                            { mask: '000.000.000-00' },
                                            { mask: '00.000.000/0000-00' }
                                        ]}
                                        placeholder="Digite o CPF ou CNPJ"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'telefone']} label={<Text strong>Telefone</Text>}>
                                    <MaskedInput mask="(00) 00000-0000" placeholder="(11) 99999-9999" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'email']} label={<Text strong>E-mail</Text>}>
                                    <Input placeholder="cliente@email.com" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['cliente', 'solicitante']} label={<Text strong>Solicitante</Text>}>
                                    <Input placeholder="Nome do solicitante" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Seção 2: Dados do Veículo */}
                    <Card style={{ marginBottom: 24 }} title={<Title level={4}>Dados do Veículo</Title>}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'modelo']} label={<Text strong>Modelo</Text>}>
                                    <Input placeholder="Modelo do veículo" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'ano']} label={<Text strong>Ano</Text>}>
                                    <Input placeholder="Ano do veículo" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'cor']} label={<Text strong>Cor</Text>}>
                                    <Input placeholder="Cor do veículo" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['veiculo', 'placa']} label={<Text strong>Placa</Text>}>
                                    <Input placeholder="ABC1234" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item name={['veiculo', 'observacoes']} label={<Text strong>Observações</Text>}>
                                    <Input.TextArea placeholder="Observações sobre o veículo..." autoSize={{ minRows: 2, maxRows: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Seção 3: Origem e Destino */}
                    <Row gutter={24} style={{ marginBottom: 24 }}>
                        <Col span={12}>
                            <Card title={<Title level={4}>Origem</Title>}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['origem', 'cep']} label={<Text strong>CEP</Text>}>
                                            <MaskedInput
                                                mask="00000-000"
                                                placeholder="00000-000"
                                                onChange={(e) => handleCepChange(e, 'origem')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={['origem', 'cidade']} label={<Text strong>Cidade</Text>}>
                                            <Input placeholder="Cidade" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={['origem', 'estado']} label={<Text strong>Estado</Text>}>
                                            <Input placeholder="UF" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['origem', 'bairro']} label={<Text strong>Bairro</Text>}>
                                            <Input placeholder="Bairro" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Form.Item name={['origem', 'logradouro']} label={<Text strong>Logradouro</Text>}>
                                            <Input placeholder="Rua, Avenida..." />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name={['origem', 'numero']} label={<Text strong>Número</Text>}>
                                            <Input placeholder="Nº" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title={<Title level={4}>Destino</Title>}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['destino', 'cep']} label={<Text strong>CEP</Text>}>
                                            <MaskedInput
                                                mask="00000-000"
                                                placeholder="00000-000"
                                                onChange={(e) => handleCepChange(e, 'destino')}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={['destino', 'cidade']} label={<Text strong>Cidade</Text>}>
                                            <Input placeholder="Cidade" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={['destino', 'estado']} label={<Text strong>Estado</Text>}>
                                            <Input placeholder="UF" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item name={['destino', 'bairro']} label={<Text strong>Bairro</Text>}>
                                            <Input placeholder="Bairro" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={18}>
                                        <Form.Item name={['destino', 'logradouro']} label={<Text strong>Logradouro</Text>}>
                                            <Input placeholder="Rua, Avenida..." />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item name={['destino', 'numero']} label={<Text strong>Número</Text>}>
                                            <Input placeholder="Nº" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    {/* Seção de Dados do Serviço */}
                    <Card style={{ marginBottom: 24 }} title={<Title level={4}>Dados do Serviço</Title>}>
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['servico', 'seguradora']} label={<Text strong>Seguradora</Text>}>
                                    <Input placeholder="Seguradora" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['servico', 'sinistro']} label={<Text strong>Sinistro</Text>}>
                                    <Input placeholder="Número do sinistro" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={8}>
                                <Form.Item name={['servico', 'dataServico']} label={<Text strong>Data do Serviço</Text>}>
                                    <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} placeholder="Selecionar data" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item name={['servico', 'hora']} label={<Text strong>Hora</Text>}>
                                    <TimePicker
                                        format="HH:mm"
                                        style={{ width: '100%' }}
                                        placeholder="Selecionar hora"
                                        value={form.getFieldValue(['servico', 'hora'])} // mantém o form controlado
                                        onSelect={(time) => form.setFieldsValue({ servico: { ...form.getFieldValue('servico'), hora: time } })} // atualiza imediatamente
                                    />
                                </Form.Item>

                            </Col>
                            <Col span={8}>
                                <Form.Item name={['servico', 'tipoServico']} label={<Text strong>Tipo de Serviço</Text>}>
                                    <Input placeholder="Ex: reboque, socorro mecânico, chaveiro..." />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item name={['servico', 'motoristaId']} label={<Text strong>Prestador (Motorista Responsável)</Text>}>
                                    <Select placeholder="Selecione o motorista" loading={loadingMotoristas}>
                                        {(motoristas || []).map(motorista => (
                                            <Option key={motorista.id} value={motorista.id}>
                                                {motorista.nome}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name={['servico', 'guinchoId']} label={<Text strong>Veículo (Atribuir Guincho)</Text>}>
                                    <Select placeholder="Selecione o guincho" loading={loadingGuinchos}>
                                        {(guinchos || []).map(guincho => (
                                            <Option key={guincho.id} value={guincho.id}>
                                                {`${guincho.modelo} - ${guincho.placa}`}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Form.Item name={['cliente', 'observacoes']} label={<Text strong>Campo de Observações</Text>}>
                                    <Input.TextArea placeholder="Observações gerais do chamado..." autoSize={{ minRows: 2, maxRows: 6 }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Botões */}
                    <div style={{ textAlign: 'right', marginTop: 24 }}>
                        <Button style={{ marginRight: 8 }} onClick={handleBackClick}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" loading={isSaving} disabled={isSubmitDisabled}>
                            Salvar Chamado
                        </Button>
                    </div>
                </Form>
            </Content>

            <Modal
                title="Descartar alterações?"
                open={isConfirmModalOpen}
                onOk={() => navigate('/dashboard')} // Ação do botão OK é navegar
                onCancel={() => setIsConfirmModalOpen(false)} // Ação do botão Cancelar é só fechar
                okText="Sim, descartar"
                cancelText="Não"
                okType="danger"
            >
                <p>Você preencheu alguns campos. Se voltar, os dados serão perdidos. Deseja continuar?</p>
            </Modal>

        </Layout >
    );
};

export default ChamadoForm;