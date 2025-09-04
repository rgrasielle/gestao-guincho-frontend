import { useState } from 'react';
import { message } from "antd";
import { useChamados, useAtualizarChamado } from "../../hooks/useChamados";
import { Select, Typography, Pagination as AntdPagination } from 'antd';

import CustomModal from '../../components/CustomModal';

// Componentes exclusivos da página Chamados
import Filters from './Filters';
import CallsList from './CallsList';
import ValoresServicoFormModal from './ValoresServicoFormModal';
import EditarChamadoFormModal from './EditarChamadoFormModal';
import VerChamadoModal from './VerChamadoModal';
import UpdateCallStatusModal from './UpdateCallStatusModal';

const { Text } = Typography;

const ChamadosPage = () => {

    // Estado da paginação
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    // Hook de busca (passando paginação como filtro)
    const { data, isLoading, error } = useChamados({
        page: currentPage - 1, // Spring é zero-based
        size: pageSize,
    });

    // Mutation de atualização
    const { mutate: atualizarChamado } = useAtualizarChamado();

    // Estado do modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(450);

    const currentCalls = data?.content || [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Função para abrir o modal de Ver
    const handleShowViewModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle(`Chamado ${callId}`);
        setModalContent(<VerChamadoModal onCancel={handleCancel} chamadoData={call} />);
        setModalWidth(750);
        setIsModalOpen(true);
    };

    // Função para abrir o modal de Editar
    const handleShowEditModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle(`Editar Chamado ${callId}`);
        setModalContent(<EditarChamadoFormModal onCancel={handleCancel} onSave={handleSaveEdit} chamadoData={call} />);
        setModalWidth(900);
        setIsModalOpen(true);
    };

    // Função para abrir o modal de Registrar Valores
    const handleShowValuesModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle(`Valores do Serviço - Chamado ${callId}`);
        setModalContent(<ValoresServicoFormModal onCancel={handleCancel} onSave={handleSave} call={call} />);
        setModalWidth(900);
        setIsModalOpen(true);
    };

    // Função para atualizar Status
    const handleShowUpdateStatusModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle('');
        setModalContent(<UpdateCallStatusModal onCancel={handleCancel} onSave={handleSave} callData={call} />);
        setModalWidth(450); // Largura menor para este modal
        setIsModalOpen(true);
    };

    const handleSaveEdit = (id, values) => {
        atualizarChamado(
            { id, dados: values },
            {
                onSuccess: () => {
                    message.success("Chamado atualizado com sucesso!");
                    setIsModalOpen(false);
                },
                onError: () => {
                    message.error("Erro ao atualizar chamado");
                },
            }
        );
    };

    const handleSave = (values) => {
        console.log('Valores salvos:', values);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalWidth(450);
    };

    // Estados de carregamento e erro
    if (isLoading) return <p>Carregando chamados...</p>;
    if (error) return <p>Erro ao carregar chamados: {error.message}</p>;

    return (
        <div>
            <Filters />
            <CallsList
                calls={currentCalls}
                onShowValuesModal={handleShowValuesModal}
                onShowEditModal={handleShowEditModal}
                onShowViewModal={handleShowViewModal}
                onShowUpdateStatusModal={handleShowUpdateStatusModal}
            />

            {/* Paginação */}
            <div style={{ textAlign: "right", marginTop: 24 }}>
                <AntdPagination
                    total={data?.totalElements || 0}
                    pageSize={pageSize}
                    current={(data?.number || 0) + 1} // +1 pq Spring é zero-based
                    onChange={handlePageChange}
                    showTotal={(total, range) =>
                        `Mostrando ${range[0]}-${range[1]} de ${total} chamados`
                    }
                    showSizeChanger={false}
                />
            </div>

            {/* Modal */}
            <CustomModal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={modalWidth}
            >
                {modalContent}
            </CustomModal>
        </div>
    );
};

export default ChamadosPage;