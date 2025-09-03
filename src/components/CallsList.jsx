import { Pagination } from 'antd';
import CallListItem from './CallListItem';

const CallsList = ({ calls, onShowValuesModal, onShowEditModal, onShowViewModal, onShowUpdateStatusModal }) => {
    return (
        <div>
            {/* Mapeia a lista de chamados para renderizar um CallListItem para cada item */}
            {calls.map((call) => (
                <CallListItem
                    key={call.id}
                    call={call}
                    onShowValuesModal={onShowValuesModal}
                    onShowEditModal={onShowEditModal}
                    onShowViewModal={onShowViewModal}
                    onShowUpdateStatusModal={onShowUpdateStatusModal}
                />
            ))}

            {/* Paginação */}
            <div style={{ textAlign: 'right', marginTop: 24 }}>
                <Pagination
                    defaultCurrent={1}
                    total={calls.length}
                    pageSize={3} // Exibe 3 chamados por página
                    showSizeChanger={false}
                    showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} chamados`}
                />
            </div>
        </div>
    );
};

export default CallsList;