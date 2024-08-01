import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import Avatar from './avatar';
import { GET_USER_BY_ID, EDIT_USER, CREATE_USER } from '../schema/users.tsx';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import client from '../client';
import type { FormProps } from 'antd';
import useNotification from '../components/notification';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

type FieldType = {
    id: number,
    avatar: {
        id: number,
        avatarUrl: string
    },
    name: string,
    gender: 'male' | 'female',
    email: string,
}

const { Option } = Select;

export async function loader(state: any) {
    const { data } = await client.query({
        query: GET_USER_BY_ID,
        variables: {
            id: state.params.id
        },
        fetchPolicy: 'network-only'
    })
    return data?.usersById[0]
}

const editUser = async function editUser(user: FieldType) {
    const { data } = await client.mutate({
        mutation: EDIT_USER,
        variables: {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            gender: user.gender,
            email: user.email
        },
    })
    return data?.updateUser
}

const createUser = async function createUser(user: FieldType) {
    const { data } = await client.mutate({
        mutation: CREATE_USER,
        variables: {
            name: user.name,
            avatar: user.avatar,
            gender: user.gender,
            email: user.email
        },
    })
    return data?.createUser
}

const App: React.FC = () => {
    const [form] = Form.useForm()
    const user = useLoaderData() as FieldType || {
        avatar: -1,
        id: -1,
        name: '',
        gender: 'male',
        email: ''
    }
    let avatarId = user.avatar?.id || null
    const openNotification = useNotification(); // 提示消息
    const navigate = useNavigate()
    const location = useLocation()
    const isCreate = location.pathname.split('/').pop() === 'createUser'
    const onGenderChange = (value: string) => {
        switch (value) {
          case 'male':
            form.setFieldsValue({ note: 'Hi, man!' });
            break;
          case 'female':
            form.setFieldsValue({ note: 'Hi, lady!' });
            break;
          case 'other':
            form.setFieldsValue({ note: 'Hi there!' });
            break;
          default:
            const _exhaustiveCheck: never = value;
            return _exhaustiveCheck;
        }
    };

    const getAavatarId = (value: number) => {
        avatarId = value
    }

    const onFinish: FormProps['onFinish'] = (values) => {
        values.avatar = avatarId || null
        if (isCreate) {
            createUser(values).then((data) => {
                if (data.ok === true) {
                    openNotification({
                        message: '创建提示',
                        description: '创建成功！'
                    });
                    navigate('/users', { state: { ok: true }})
                } else {
                    openNotification({
                        message: '创建提示',
                        description: '创建失败！'
                    });
                }
            })
        } else {
            editUser(values).then((data) => {
                if (data.ok === true) {
                    openNotification({
                        message: '修改提示',
                        description: '修改成功！'
                    });
                    navigate('/users', { state: { ok: true }})
                } else {
                    openNotification({
                        message: '修改提示',
                        description: '修改失败！'
                    });
                }
            })
        }
    };

    return (
        <Form
          name="userEdit"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={user}
          onFinish={onFinish}
          autoComplete="off"
        >
            <Form.Item<FieldType>
                name="id"
                label="id"
                style={{ display: 'none' }}
            >
            </Form.Item>
            <Form.Item<FieldType>
                name="avatar"
                label="avatar"
                // rules={[{ required: true, message: 'Please input your avatar!' }]}
            >
                <Avatar avatar={{ url: user.avatar?.avatarUrl, getId: (id: number) => getAavatarId(id) }} />
            </Form.Item>
            <Form.Item<FieldType>
                name="name"
                label="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input
                  style={{ display: 'inline-block', width: 'calc(50% - 16px)' }}
                  placeholder='Please input your name'
                />
            </Form.Item>
            <Form.Item<FieldType>
                name="gender"
                label="gender"
                rules={[{ required: true }]}
            >
                <Select
                    placeholder="Select an option and change input text above"
                    onChange={onGenderChange}
                    allowClear
                >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                </Select>
            </Form.Item>
            <Form.Item<FieldType>
                name="email"
                label="email"
            >
                <Input
                  placeholder='Please input your email'
                />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}

export default App;

