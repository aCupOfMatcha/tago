import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Image } from 'antd';
import type { GetProp, UploadProps } from 'antd';

// 一、GetProp:隶属antd，还有GetProps，从名字上就能知道获取单个和全部
// beforeUpload?: (file: RcFile, FileList: RcFile[]) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
// type BeforeUploadValueType = string | boolean | void | File | Blob
// 二、Parameters 用来获取函数参数的类型
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]; // 因为可能接受的是RcFile数组，所以取[0]


const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader(); // 让我回忆起当年的java
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img); // 将图像文件转换为 Base64 字符串，通过reader.result读取
};

// 上传前的校验，没什么好说的
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface avatarProps {
  avatar: {
    getId: (id: number) => void,
    url: string
  } 
}

const App: React.FC<avatarProps> = ({ avatar }) => {
  const [loading, setLoading] = useState(false); // 为了用户体验我们还是决定设置loading
  const avtarInitUrl = avatar.url ? 'https://127.0.0.1:8000/media/' + avatar.url : '';
  const [imageUrl, setImageUrl] = useState<string>(avtarInitUrl);

  const handleChange: UploadProps['onChange'] = (info) => {
    getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        avatar.getId(info.file.response?.avatar.id);
      });
    /* 下面是正常的根据后台返回结果进行处理，我们直接页面显示就好
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    */
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
        <Upload
          name="avatar"
          listType="picture-card" // 上传列表的内建样式
          className="avatar-uploader" // 样式暂且没用
          showUploadList={false} // 是否展示已上传文件列表(因为只是一个头像所以false)
          action="https://localhost:8000/users/avatar/" // 这个是用来后台校验的，我们直接跳过
          beforeUpload={beforeUpload} // 上传前的校验
          onChange={handleChange} // 上传文件改变时的回调
        >
            {imageUrl ? 
                <Image 
                  src={imageUrl}
                  alt="avatar"
                  style={{ width: '100%' }}
                  preview={ false }/> // 如果要预览同时允许重新上传，用tooltip是个好的解决方案。但是再研究不值得
            : uploadButton}
        </Upload>
    </>
  );
};

export default App;