import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { DELETE_USER_BY_ID } from '../schema/users';
import clientStore from '../client';
import useNotification from '../components/notification';


interface UserDeleteProps {
    userDelete: {
        id: number;
        getState: (state: boolean) => void;
    }
}

const App: React.FC<UserDeleteProps> = ({ userDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openNotification = useNotification(); // 提示消息

    const showModal = () => {
        setIsOpen(true);
    };

    const handleOk = () => {
        clientStore.client.mutate({
            mutation: DELETE_USER_BY_ID,
            variables: { id: userDelete.id }
        }).then((data) => {
            if (data.data?.deleteUser.ok === true) {
                userDelete.getState(true);
                setIsOpen(false);
                openNotification({
                    message: '删除提示',
                    description: '删除成功！'
                });
            } else {
                userDelete.getState(false);
                setIsOpen(false);
                openNotification({
                    message: '删除提示',
                    description: '删除失败！'
                });
            }
            
        });
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
        <Button type="link" style={{ fontWeight: '500' }} onClick={showModal}>
            DELETE
        </Button>
        <Modal
          title="删除"
          open={isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >
            <p>是否确认要删除该用户？</p>
        </Modal>
        </>
    );
}

export default App;