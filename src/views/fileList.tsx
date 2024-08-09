import React from 'react';
import { Table, Upload } from 'antd';
import type { TableProps } from 'antd';
import client from '../client.tsx';
import { GET_FILES } from '../schema/files.tsx';
import { useLoaderData } from'react-router-dom';
import TableSearch from '../components/tableSearch.tsx';


type ColumnsType<T> = TableProps<T>['columns'];

interface DataType {
  name: string;
  size: string;
  created_at: Date;
  tags: string;
}

export async function loader() {
  const { data } = await client.query({
    query: GET_FILES,
  })
  return data?.allFiles
}

const UpFile: React.FC = () => {
  return (
    <Upload
      action="https://localhost:8000/file/"
      multiple={true}
      showUploadList={false}
      >
      <button>上传</button>
    </Upload>
  )
}

const App: React.FC = () => {
  const data = useLoaderData() as DataType[]
  const tableData = data;
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
    }
  ]

  const handleSearch = (value: string) => {
    console.log(111)
  }

  return (
    <>
      <TableSearch searchMethod={handleSearch} CustomCom={UpFile} type='file' />
      <Table
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default App;