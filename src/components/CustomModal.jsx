import React from 'react';
import { Modal } from 'antd';
import { TruckOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';

const CustomModal = ({ title, open, onOk, onCancel, children, width }) => { // 👈 Adicione 'width' aqui
    const getTitleWithIcon = (modalTitle) => {
        let icon = null;

        switch (modalTitle) {
            case 'Cadastrar Motorista':
                icon = <UserOutlined style={{ marginRight: 8 }} />;
                break;
            case 'Cadastrar Guincho':
                icon = <TruckOutlined style={{ marginRight: 8 }} />;
                break;
            case 'Configurar Valores Fixos':
                icon = <DollarOutlined style={{ marginRight: 8 }} />;
                break;
            case 'Chamado':
                icon = <UserOutlined style={{ marginRight: 8 }} />;
                break;
            default:
                icon = null;
        }

        return (
            <span style={{ fontWeight: 'bold', display: 'block', marginBottom: 16, fontSize: 18 }}>
                {icon}
                {modalTitle}
            </span>
        );
    };

    return (
        <Modal
            title={getTitleWithIcon(title)}
            open={open}
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={width || 450} // 👈 Use a largura dinâmica ou o padrão 450
        >
            {children}
        </Modal>
    );
};

export default CustomModal;