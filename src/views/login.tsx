import React, { useState } from'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useNotification from '../components/notification';
import clientStore from '../client.tsx';


interface LoginFormValues {
  username: string;
  password: string;
}

async function login(username: string, password: string) {
  const data = {
    username: username, 
    password: password
  }
  const res = await fetch('https://127.0.0.1:8000/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  const result = await res.json()
  const authorization = res.headers.get('Authorization') || ''
  localStorage.setItem('Authorization', authorization);
  clientStore.setAuth();
  return result;
}

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const openNotification = useNotification(); // 提示消息

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    const result = await login(values.username, values.password)
    if (result.code === 200) {
      navigate('/home');
    } else {
      localStorage.removeItem('Authorization')
      setLoading(false);
      openNotification({
        message: '登录提示',
        description: '登录失败！' + result.msg
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item<LoginFormValues>
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              placeholder="用户名"
              style={{ width: '100%' }}
              maxLength={20} 
            />
          </Form.Item>
          <Form.Item<LoginFormValues>
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder="密码"
              style={{ width: '100%' }}
              maxLength={16} 
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

// CSS 样式
const styles = `
 .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

 .login-form {
    width: 300px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

// 将样式添加到文档头部
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

export default LoginForm;