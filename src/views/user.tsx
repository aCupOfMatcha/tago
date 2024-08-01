import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Space } from 'antd';
import { Link, useLoaderData, useLocation, useNavigate } from'react-router-dom';
import TableSearch from '../components/tableSearch';
import { GET_USER_BY_NAME, GET_USERS } from '../schema/users.tsx';
import UserDelete from './userDelete.tsx'
import client from '../client';

type ColumnsType<T> = TableProps<T>['columns'];

interface DataType {
  id: number;
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

export async function loader() {
    const { data } = await client.query({
        query: GET_USERS,
    })
    return data?.allUsers
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<String>('');
  const data = useLoaderData() as DataType[]
  const [tableData, setTableData] = useState<DataType[]>(data);
  const [delState, setDelState] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const columns: ColumnsType<DataType> = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'MALE' },
        { text: 'Female', value: 'FEMALE' },
      ],
      onFilter: (value, record) => record.gender.indexOf(value as string) === 0,
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      width: 150,
      fixed: 'right',
      render: (record) => (
        <Space>
          <Link to={`/users/editUser/${record.id}`}>EDIT</Link>
          <UserDelete userDelete={{ id: record.id, getState: (state) => { setDelState(state) } }}/>
        </Space>
      ),
    },
  ];

  const handleSearch = (searchValue: string) => {
    setInputValue(searchValue);
  }

  const handleCreate = () => {
    navigate('/users/createUser')
  }

  useEffect(() => {
    if (delState) {
      client.query({
        query: GET_USERS,
        fetchPolicy: 'network-only', // Doesn't check cache before making a network request
      }).then((data) => {
        setTableData(data.data?.allUsers)
      })
    } else {
      client.query({
        query: GET_USER_BY_NAME,
        variables: { name: inputValue },
        fetchPolicy: (state && state.ok && state.ok === true) ? 'network-only' : 'cache-first', // 因为修改后也需要更新数据
      }).then((data) => {
        setTableData(data.data?.usersByName)
      })
    }
  }, [delState, inputValue])

  return (
    <><TableSearch searchMethod={handleSearch} createMethod={handleCreate}/>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={tableData}
      />
    </>
  );
};

export default App;