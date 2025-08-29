import { Pagination as AntdPagination } from 'antd';

const Pagination = ({ total, pageSize, current, onChange }) => {
    return (
        <div style={{ textAlign: 'right', marginTop: 24 }}>
            <AntdPagination
                showSizeChanger={false}
                showTotal={(total, range) => `Mostrando ${range[0]}-${range[1]} de ${total} chamados`}
                total={total}
                pageSize={pageSize}
                current={current}
                onChange={onChange}
            />
        </div>
    );
};

export default Pagination;