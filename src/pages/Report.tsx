import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Pagination, Dropdown, Menu } from 'antd';
import { DownloadOutlined } from '@mui/icons-material';
import { DownOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

interface DataItem {
  country: string; // New field for Select Type filter
  region: string;
  cap: string;
  domain: string;
  subdomain: string;
  name: string;
  business_owner: string;
}

const Report: React.FC = () => {
  const [selectType, setSelectType] = useState<string>('global'); // New state for Select Type filter
  const [region, setRegion] = useState<string>('');
  const [filterType, setFilterType] = useState<string>(''); // New state for filter type
  const [search, setSearch] = useState<string>(''); // Search term for the selected filter type
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5); // Page size state
  const [data, setData] = useState<any>([]);

  const columns = [
    { title: 'Type', dataIndex: 'country', key: 'type' }, // Added Type column
    { title: 'Region', dataIndex: 'region', key: 'regional' },
    { title: 'Business Capability Name', dataIndex: 'cap', key: 'businessCapability' },
    { title: 'Domain', dataIndex: 'domain', key: 'domain' },
    { title: 'Sub-domain', dataIndex: 'subdomain', key: 'subDomain' },
    { title: 'Application Name', dataIndex: 'name', key: 'application' },
    // { title: 'Business Owner', dataIndex: 'business_owner', key: 'business_owner'}
  ];

  const fetchData  = async (body:any) => {
    const raw = JSON.stringify(body);
    const response = await fetch(process.env.REACT_APP_API_URL+"getReport",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: raw
    });
    const data = await response.json();
    setData(data?.response);
  }
  useEffect(() => {
    fetchData({
      "filter": {
        "reportType": selectType
      }
    });
  },[]);

  const handleApply = () => {
    console.log(selectType, region, filterType, search);
    fetchData({
      "filter":{
        "reportType": selectType,
        "region":region,
        [filterType]:search
      }
    });
  };

  const handleExport = () => {
    const csvContent = [
      columns.map(col => col.title).join(','), // Headers
      ...data.map((row:any) =>
        columns.map(col => row[col.dataIndex as keyof DataItem] || '').join(',') // Row values
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'Regional_Report.csv');
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const pageSizeMenu = (
    <Menu onClick={(e) => handlePageSizeChange(parseInt(e.key))}>
      <Menu.Item key="10">10 items</Menu.Item>
      <Menu.Item key="50">50 items</Menu.Item>
      <Menu.Item key="100">100 items</Menu.Item>
    </Menu>
  );

  return (
    <div className="regional-report">
      <h1>Report</h1>
      <p>Detailed information about Report</p>

      <div className="filters" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <Select
          placeholder="Select Type"
          onChange={(value: string) => setSelectType(value)}
          allowClear
          style={{ flex: 1, maxWidth: '300px', height: '45px' }}
          value={selectType}
        >
          <Select.Option value="Regional">Regional</Select.Option>
          <Select.Option value="global">Global</Select.Option>
          <Select.Option value="Country">Country</Select.Option>
        </Select>

        {selectType === "global" &&<Select
          placeholder="Regional"
          onChange={(value: string) => setRegion(value)}
          allowClear
          style={{ flex: 1, maxWidth: '300px', height: '45px' }}
        >
          <Select.Option value="AMERICAS">AMERICAS</Select.Option>
          <Select.Option value="APAC">APAC</Select.Option>
          <Select.Option value="EMEA">EMEA</Select.Option>
        </Select>}

        <Select
          placeholder="Filter By"
          onChange={(value: string) => setFilterType(value)}
          allowClear
          style={{ flex: 1, maxWidth: '300px', height: '45px' }}
        >
          {columns.map((col) => <Select.Option key={col.dataIndex} value={col.dataIndex}>{col.title}</Select.Option>)}
        </Select>

        <Input
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          style={{ flex: 2, maxWidth: '500px', padding: '10px' }}
        />
        <Button type="primary" onClick={handleApply} style={{ flex: 'none', padding: '20px' }}>Apply</Button>
      </div>

      <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div></div> {/* Empty div to push export button to the right */}
        <Button icon={<DownloadOutlined />} onClick={handleExport}>Export</Button>
      </div>

      <Table
        columns={columns}
        dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        rowKey="application"
      />

      <div className="pagination-control" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Dropdown overlay={pageSizeMenu}>
          <Button>
            Show rows: {pageSize} <DownOutlined />
          </Button>
        </Dropdown>

        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={pageSize}
          onChange={(page: number) => setCurrentPage(page)}
          showSizeChanger={false}
          style={{ marginLeft: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Report;