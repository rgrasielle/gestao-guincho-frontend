import { Modal } from 'antd';

const ConfirmationModal = ({
    open,
    title,
    content,
    onConfirm,
    onCancel,
    okText = "Confirmar",
    cancelText = "Cancelar",
}) => {
    return (
        <Modal
            title={title}
            open={open}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={okText}
            cancelText={cancelText}
            okType="danger"
        >
            <p>{content}</p>
        </Modal>
    );
};

export default ConfirmationModal;