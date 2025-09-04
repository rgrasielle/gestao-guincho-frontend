import { useState } from 'react';
import { Pagination, Modal, message } from 'antd';
import CallListItem from './CallListItem';
import UpdateCallStatusModal from './UpdateCallStatusModal';
import { useAtualizarStatus } from '../../hooks/useAtualizarStatus';

const CallsList = ({ calls, onShowValuesModal, onShowEditModal, onShowViewModal }) => {
    const [selectedCall, setSelectedCall] = useState(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

    const atualizarStatusMutation = useAtualizarStatus();

    const handleShowUpdateStatusModal = (call) => {
        setSelectedCall(call);
        setIsStatusModalOpen(true);
    };

    const handleSaveStatus = async ({ id, newStatus }) => {
        try {
            await atualizarStatusMutation.mutateAsync({ id, status: newStatus });
            message.success('Status atualizado com sucesso!');
            setIsStatusModalOpen(false);
        } catch (error) {
            message.error('Erro ao atualizar status');
            console.error(error); // opcional, para debug
        }
    };

    return (
        <>
            {calls.map((call) => (
                <CallListItem
                    key={call.id}
                    call={call}
                    onShowValuesModal={onShowValuesModal}
                    onShowEditModal={onShowEditModal}
                    onShowViewModal={onShowViewModal}
                    onShowUpdateStatusModal={() => handleShowUpdateStatusModal(call)}
                />
            ))}

            <Pagination
                defaultCurrent={1}
                total={calls.length}
                pageSize={3}
                showSizeChanger={false}
                showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} chamados`}
                style={{ textAlign: 'right', marginTop: 24 }}
            />

            <Modal
                open={isStatusModalOpen}
                footer={null}
                onCancel={() => setIsStatusModalOpen(false)}
                destroyOnClose
            >
                {selectedCall && (
                    <UpdateCallStatusModal
                        chamadoData={selectedCall}
                        onCancel={() => setIsStatusModalOpen(false)}
                        onSave={handleSaveStatus} // lógica fora do modal
                    />
                )}
            </Modal>
        </>
    );
};

export default CallsList;