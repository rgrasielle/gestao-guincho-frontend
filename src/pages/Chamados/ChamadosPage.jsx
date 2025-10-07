import { useEffect, useState } from 'react';
import { Typography, Pagination as AntdPagination, Spin } from 'antd';
import dayjs from 'dayjs';

import CustomModal from '../../components/CustomModal';
import Filters from './Filters';
import CallsList from './CallsList';
import ValoresServicoFormModal from './ValoresServicoFormModal';
import EditarChamadoFormModal from './EditarChamadoFormModal';
import VerChamadoModal from './VerChamadoModal';
import UpdateCallStatusModal from './UpdateCallStatusModal';

// Hooks
import { useChamados, useAtualizarChamado, useAtualizarStatus } from "../../hooks/useChamados";
import { useDebounce } from '../../hooks/useDebounce';

const { Text } = Typography;

const ChamadosPage = () => {

    // --- ESTADOS ---
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [activeFilters, setActiveFilters] = useState({});
    const [showMoreFilters, setShowMoreFilters] = useState(false);
    const [buscaValue, setBuscaValue] = useState('');

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const [modalWidth, setModalWidth] = useState(450);

    // --- HOOKS ---
    const debouncedBusca = useDebounce(buscaValue, 500);

    const { data, isLoading, isFetching, error } = useChamados({
        page: currentPage - 1,
        size: pageSize,
        ...activeFilters,
        busca: debouncedBusca || null,
    });

    const { mutate: atualizarChamado } = useAtualizarChamado();
    const { mutate: atualizarStatus } = useAtualizarStatus();

    const [currentCalls, setCurrentCalls] = useState(data?.content || []);

    useEffect(() => {
        if (data?.content) {
            setCurrentCalls(data.content);
        }
    }, [data]);

    // --- FUNÇÕES ---
    const handlePageChange = (page) => setCurrentPage(page);
    const handleCancel = () => setIsModalOpen(false);

    const handleFilterChange = (field, value) => {
        if (field === 'busca') {
            setBuscaValue(value);
        } else {
            setActiveFilters(prevFilters => ({
                ...prevFilters,
                [field]: value === 'todos' || value === 'todas' ? null : value
            }));
        }
        setCurrentPage(1);
    };

    // --- FUNÇÕES DE SALVAR  ---
    const handleSaveEdit = (id, values) => {
        atualizarChamado({ id, dados: values }, {
            onSuccess: () => {
                handleCancel();
            }
        });
    };

    const handleSaveStatus = (id, status) => {
        atualizarStatus({ id, status }, {
            onSuccess: () => {
                handleCancel();
            }
        });
    };

    // --- FUNÇÕES PARA ABRIR OS MODAIS ---

    // Editar
    const handleShowEditModal = (callId) => {

        const call = currentCalls.find(c => c.id === callId);
        if (!call) return;

        console.log(call)

        const chamadoDataFormatted = {
            ...call,
            dataServico: call.dataServico ? dayjs(call.dataServico, "YYYY-MM-DD") : null,
            hora: call.hora ? dayjs(call.hora, "HH:mm:ss") : null,
        };

        setModalTitle(`Editar Chamado ${callId}`);
        setModalContent(
            <EditarChamadoFormModal
                key={callId}
                onCancel={handleCancel}
                onSave={handleSaveEdit}
                chamadoData={chamadoDataFormatted}
            />
        );
        setModalWidth(900);
        setIsModalOpen(true);
    };

    // Registrar Valores
    const handleShowValuesModal = (callId) => {
        setModalTitle(`Valores do Serviço - Chamado ${callId}`);
        setModalContent(
            <ValoresServicoFormModal
                key={callId}
                chamadoId={callId}
                onCancel={handleCancel}
                onSave={handleCancel}
            />
        );
        setModalWidth(900);
        setIsModalOpen(true);
    };

    // Atualizar status
    const handleShowUpdateStatusModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle('');
        setModalContent(<UpdateCallStatusModal onCancel={handleCancel} onSave={handleSaveStatus} chamadoData={call} />);
        setModalWidth(450);
        setIsModalOpen(true);
    };

    // Ver
    const handleShowViewModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle(`Chamado CH${String(call.id).padStart(3, '0')}`);
        setModalContent(<VerChamadoModal onCancel={handleCancel} chamadoData={call} />);
        setModalWidth(750);
        setIsModalOpen(true);
    };

    // --- RENDER ---
    if (isLoading) return <p>Carregando chamados...</p>;
    if (error) return <p>Erro ao carregar chamados: {error.message}</p>;

    return (
        <div>
            <Filters
                onFilterChange={handleFilterChange}
                showMoreFilters={showMoreFilters}
                setShowMoreFilters={setShowMoreFilters}
                filters={activeFilters}
                buscaValue={buscaValue}
            />

            <Spin spinning={isFetching} tip="Atualizando...">
                <CallsList
                    calls={currentCalls}
                    onShowValuesModal={handleShowValuesModal}
                    onShowEditModal={handleShowEditModal}
                    onShowViewModal={handleShowViewModal}
                    onShowUpdateStatusModal={handleShowUpdateStatusModal}
                />
            </Spin>

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