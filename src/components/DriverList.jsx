import React from 'react';
import { Row, Col, Empty } from 'antd';
import DriverCard from './DriverCard';

const DriverList = ({ drivers, onEdit }) => {
    if (!drivers || drivers.length === 0) {
        return <Empty description="Nenhum motorista cadastrado." />;
    }

    return (
        <Row gutter={[16, 16]}>
            {drivers.map((driver) => (
                <Col key={driver.id} xs={24} sm={24} md={12} lg={12}>
                    <DriverCard driver={driver} onEdit={onEdit} />
                </Col>
            ))}
        </Row>
    );
};

export default DriverList;