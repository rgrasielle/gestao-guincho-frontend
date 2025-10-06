import { useState } from 'react';
import { Form, Input, Select, Button, Space, Row, Col, Typography, Divider, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { MaskedInput } from 'antd-mask-input';

import { useMotoristas } from '../../hooks/useMotoristas';
import { useGuinchos } from '../../hooks/useGuinchos';
import { useEnterToNavigate } from '../../hooks/useEnterToNavigate';
import { useDeletarChamado } from '../../hooks/useChamados';

import ConfirmationModal from '../../components/ConfirmationModal';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EditarChamadoFormModal = ({ onCancel, onSave, chamadoData }) => {
    const [form] = Form.useForm();
    const handleKeyDown = useEnterToNavigate();

    const { data: motoristas, isLoading: loadingMotoristas } = useMotoristas();
    const { data: guinchos, isLoading: loadingGuinchos } = useGuinchos();

    // Hooks para exclusão
    const { mutate: deletarChamado, isLoading: isDeleting } = useDeletarChamado();
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);



    const handleFinish = (values) => {
        const dtoParaEnviar = {
            cliente: {
                nome: values.clienteNome,
                cpfCnpj: values.clienteCpfCnpj,
                telefone: values.clienteTelefone,
                email: values.clienteEmail,
                solicitante: values.clienteSolicitante
            },
            veiculo: {
                modelo: values.veiculoModelo,
                ano: values.veiculoAno,
                cor: values.veiculoCor,
                placa: values.veiculoPlaca,
                observacoes: values.veiculoObservacoes
            },
            origem: {
                cep: values.origemCep,
                cidade: values.origemCidade,
                estado: values.origemEstado,
                bairro: values.origemBairro,
                logradouro: values.origemLogradouro,
                numero: values.origemNumero
            },
            destino: {
                cep: values.destinoCep,
                cidade: values.destinoCidade,
                estado: values.destinoEstado,
                bairro: values.destinoBairro,
                logradouro: values.destinoLogradouro,
                numero: values.destinoNumero
            },
            servico: {
                seguradora: values.seguradora,
                sinistro: values.sinistro,
                dataServico: values.dataServico?.format("YYYY-MM-DD") || null,
                hora: values.hora?.format("HH:mm:ss") || null,
                tipoServico: values.tipoServico,
                guinchoId: values.guinchoId,
                motoristaId: values.motoristaId
            },
            observacoes: values.observacoes
        };

        onSave(chamadoData.id, dtoParaEnviar);
    };

    const handleConfirmDelete = () => {
        deletarChamado(chamadoData.id, {
            onSuccess: () => {
                setIsDeleteConfirmOpen(false);
                onCancel();
            },
            onError: () => {
                setIsDeleteConfirmOpen(false);
            }
        });
    };

    const handleCepChange = async (event, tipoEndereco) => {
        const cep = event.target.value.replace(/\D/g, '');

        if (cep.length !== 8) {
            return;
        }

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                console.log("CEP não encontrado.");
                return;
            }

            // Lógica ajustada para os nomes PLANOS do formulário de edição
            if (tipoEndereco === 'origem') {
                form.setFieldsValue({
                    origemCidade: data.localidade,
                    origemEstado: data.uf,
                    origemBairro: data.bairro,
                    origemLogradouro: data.logradouro,
                });
            } else if (tipoEndereco === 'destino') {
                form.setFieldsValue({
                    destinoCidade: data.localidade,
                    destinoEstado: data.uf,
                    destinoBairro: data.bairro,
                    destinoLogradouro: data.logradouro,
                });
            }

        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
        }
    };

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                onKeyDown={handleKeyDown}
                initialValues={{
                    ...chamadoData,
                    dataServico: chamadoData?.dataServico ? dayjs(chamadoData.dataServico, 'YYYY-MM-DD') : null,
                    hora: chamadoData?.hora ? dayjs(chamadoData.hora, 'HH:mm:ss') : null
                }}
            >
                {/* Dados do Cliente */}
                <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                    <Title level={5} style={{ margin: 0 }}>Dados do Cliente</Title>
                </div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="clienteNome" label="Nome (Segurado)">
                            <Input placeholder="Nome completo" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="clienteCpfCnpj" label="CPF/CNPJ">
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
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="clienteTelefone" label="Telefone">
                            <MaskedInput mask="(00) 00000-0000" placeholder="(11) 99999-9999" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="clienteEmail" label="E-mail">
                            <Input placeholder="cliente@email.com" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="clienteSolicitante" label="Solicitante">
                            <Input placeholder="Nome do solicitante" />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />

                {/* Dados do Veículo */}
                <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                    <Title level={5} style={{ margin: 0 }}>Dados do Veículo</Title>
                </div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="veiculoModelo" label="Modelo">
                            <Input placeholder="Ex: Honda Civic" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="veiculoAno" label="Ano">
                            <Input placeholder="2020" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="veiculoCor" label="Cor">
                            <Input placeholder="Branco" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="veiculoPlaca" label="Placa">
                            <Input placeholder="ABC-1234" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="veiculoObservacoes" label="Observações">
                    <TextArea placeholder="Observações sobre o veículo..." autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                <Divider />

                {/* Origem e Destino */}
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                            <Title level={5} style={{ margin: 0 }}>Origem</Title>
                        </div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="origemCep" label="CEP">
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
                                <Form.Item name="origemCidade" label="Cidade">
                                    <Input placeholder="Cidade" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="origemEstado" label="Estado">
                                    <Input placeholder="UF" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="origemBairro" label="Bairro">
                                    <Input placeholder="Bairro" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item name="origemLogradouro" label="Logradouro">
                                    <Input placeholder="Rua, Avenida..." />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="origemNumero" label="Número">
                                    <Input placeholder="Nº" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                            <Title level={5} style={{ margin: 0 }}>Destino</Title>
                        </div>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="destinoCep" label="CEP">
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
                                <Form.Item name="destinoCidade" label="Cidade">
                                    <Input placeholder="Cidade" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="destinoEstado" label="Estado">
                                    <Input placeholder="UF" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item name="destinoBairro" label="Bairro">
                                    <Input placeholder="Bairro" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Form.Item name="destinoLogradouro" label="Logradouro">
                                    <Input placeholder="Rua, Avenida..." />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="destinoNumero" label="Número">
                                    <Input placeholder="Nº" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Divider />

                {/* Dados do Serviço */}
                <div style={{ background: '#f5f5f5', padding: '12px 16px', borderRadius: '4px', marginBottom: 24 }}>
                    <Title level={5} style={{ margin: 0 }}>Dados do Serviço</Title>
                </div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="seguradora" label="Seguradora">
                            <Input placeholder="Digite o nome da seguradora" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="sinistro" label="Sinistro">
                            <Input placeholder="Número do sinistro" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="dataServico" label="Data do Serviço">
                            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="hora" label="Hora">
                            <TimePicker
                                format="HH:mm"
                                style={{ width: '100%' }}
                                value={form.getFieldValue('hora')}
                                onSelect={(time) => form.setFieldsValue({ hora: time })}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="tipoServico" label="Tipo de Serviço">
                            <Input placeholder="Ex: Reboque, Socorro Mecânico..." />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="guinchoId" label="Veículo (Atribuir Guincho)">
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
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="motoristaId" label="Prestador (Motorista Responsável)">
                            <Select placeholder="Selecione o motorista" loading={loadingMotoristas}>
                                {(motoristas || []).map(motorista => (
                                    <Option key={motorista.id} value={motorista.id}>
                                        {motorista.nome}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="observacoes" label="Campo de Observações">
                    <TextArea placeholder="Observações gerais do chamado..." autoSize={{ minRows: 2, maxRows: 6 }} />
                </Form.Item>

                {/* Botões */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24 }}>
                    <div>
                        {chamadoData && (
                            <Button
                                danger
                                onClick={() => setIsDeleteConfirmOpen(true)}
                                loading={isDeleting}
                            >
                                Excluir Chamado
                            </Button>
                        )}
                    </div>
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button type="primary" htmlType="submit">
                            Salvar Alterações
                        </Button>
                    </Space>
                </div>
            </Form>

            <ConfirmationModal
                open={isDeleteConfirmOpen}
                title="Confirmar Exclusão"
                content={`Tem certeza que deseja excluir o chamado CH${String(chamadoData?.id).padStart(3, '0')}"? Esta ação não pode ser desfeita.`}
                okText="Sim, Excluir"
                cancelText="Cancelar"
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteConfirmOpen(false)}
            />
        </>
    );
};

export default EditarChamadoFormModal;