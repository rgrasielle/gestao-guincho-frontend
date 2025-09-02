import React from 'react';
import { Row, Col, Empty } from 'antd';
import GuinchoCard from './GuinchoCard';

const GuinchoList = ({ guinchos, onEdit }) => {
    // Se a lista de guinchos estiver vazia, mostramos um componente de "vazio"
    if (!guinchos || guinchos.length === 0) {
        return <Empty description="Nenhum guincho cadastrado." />;
    }

    return (
        <Row gutter={[16, 16]}>
            {guinchos.map((guincho) => (
                <Col key={guincho.id} xs={24} sm={24} md={12} lg={12}>
                    <GuinchoCard guincho={guincho} onEdit={onEdit} />
                </Col>
            ))}
        </Row>
    );
};

export default GuinchoList;