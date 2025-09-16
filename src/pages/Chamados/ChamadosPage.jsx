import { useEffect, useState } from 'react';
import { Typography, message, Pagination as AntdPagination } from 'antd';
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

    // ----------------- Estados -----------------
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


    // ----------------- Hooks -----------------

    // Cria uma versão "atrasada" do termo de busca
    // Ele só será atualizado 500ms após o usuário parar de digitar
    const debouncedBusca = useDebounce(buscaValue, 500);

    const { data, isLoading, error, refetch } = useChamados({
        page: currentPage - 1,
        size: pageSize,
        ...activeFilters,
        busca: debouncedBusca || null,
    });

    const { mutate: atualizarChamado } = useAtualizarChamado();
    const { mutate: atualizarStatus } = useAtualizarStatus();

    // ----------------- Estado local mutável -----------------
    const [currentCalls, setCurrentCalls] = useState(data?.content || []);

    // Sincroniza estado local sempre que os dados do hook mudarem
    useEffect(() => {
        setCurrentCalls(data?.content || []);
    }, [data]);

    useEffect(() => {
        console.log("Filtros ativos sendo enviados para a API:", activeFilters);
    }, [activeFilters]);


    // ----------------- Funções -----------------
    const handlePageChange = (page) => setCurrentPage(page);

    // Função que o componente Filters vai chamar
    const handleFilterChange = (field, value) => {
        if (field === 'busca') {
            setBuscaValue(value);
        } else {
            setActiveFilters(prevFilters => ({
                ...prevFilters,
                [field]: value === 'todos' || value === 'todas' ? null : value
            }));
        }
        setCurrentPage(1); // Reseta a página em qualquer mudança de filtro
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalWidth(450);
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

    const handleSaveStatus = (id, status) => {
        atualizarStatus({ id, status }, {
            onSuccess: () => {
                message.success("Status do chamado atualizado com sucesso!");
                setIsModalOpen(false);
            },
            onError: () => {
                message.error("Erro ao atualizar status do chamado.");
            }
        });
    };

    // ----------------- Modais -----------------

    // Ver
    const handleShowViewModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle(`Chamado CH${String(call.id).padStart(3, '0')}`);
        setModalContent(<VerChamadoModal onCancel={handleCancel} chamadoData={call} />);
        setModalWidth(750);
        setIsModalOpen(true);
    };

    // Editar
    const handleShowEditModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);

        if (!call) return;

        // Converte as strings em objetos Dayjs antes de passar para o modal
        const chamadoDataFormatted = {
            ...call,
            dataServico: call.dataServico ? dayjs(call.dataServico, "YYYY-MM-DD") : null,
            hora: call.hora ? dayjs(call.hora, "HH:mm:ss") : null,
        };

        console.log("Chamado selecionado para edição (formatado):", chamadoDataFormatted);

        setModalTitle(`Editar Chamado ${callId}`);
        setModalContent(
            <EditarChamadoFormModal
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
        const call = currentCalls.find(c => c.id === callId);
        if (!call) return;

        setModalTitle(`Valores do Serviço - Chamado ${callId}`);
        setModalContent(
            <ValoresServicoFormModal
                key={callId}
                chamadoId={callId}
                onCancel={handleCancel}
                onSave={() => {
                    handleCancel();
                    message.success("Valores do serviço salvos com sucesso!");
                    refetch();
                }}
            />
        );
        setModalWidth(900);
        setIsModalOpen(true);
    };

    // Atualizar Status
    const handleShowUpdateStatusModal = (callId) => {
        const call = currentCalls.find(c => c.id === callId);
        setModalTitle('');
        setModalContent(<UpdateCallStatusModal onCancel={handleCancel} onSave={handleSaveStatus} chamadoData={call} />);
        setModalWidth(450);
        setIsModalOpen(true);
    };

    // ----------------- Render -----------------
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