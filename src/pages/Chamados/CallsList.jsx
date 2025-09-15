import CallListItem from './CallListItem';

const CallsList = ({ calls, onShowValuesModal, onShowEditModal, onShowViewModal, onShowUpdateStatusModal }) => {
    return (
        <>
            {calls.map((call) => (
                <CallListItem
                    key={call.id}
                    call={call} // vem do estado local do ChamadosPage
                    onShowValuesModal={onShowValuesModal} // callback do ChamadosPage
                    onShowEditModal={onShowEditModal}
                    onShowViewModal={onShowViewModal}
                    onShowUpdateStatusModal={onShowUpdateStatusModal} // callback do ChamadosPage
                />
            ))}
        </>
    );
};

export default CallsList;
