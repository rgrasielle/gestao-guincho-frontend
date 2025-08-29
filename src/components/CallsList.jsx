import { Pagination } from 'antd';
import CallListItem from './CallListItem';

const CallsList = ({ calls }) => {
    return (
        <div>
            {/* Mapeia a lista de chamados para renderizar um CallListItem para cada item */}
            {calls.map((call, index) => (
                <CallListItem key={index} call={call} />
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