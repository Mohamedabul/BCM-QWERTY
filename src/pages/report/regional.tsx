import React, { useState } from 'react';
import { Table, Input, Button, Select, Pagination, Dropdown, Menu } from 'antd';
import { DownloadOutlined } from '@mui/icons-material';
import { DownOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';

interface DataItem {
  regional: string;
  businessCapability: string;
  domain: string;
  subDomain: string;
  application: string;
}

const Regional: React.FC = () => {
  const [region, setRegion] = useState<string>('');
  const [filterType, setFilterType] = useState<string>(''); // New state for filter type
  const [search, setSearch] = useState<string>(''); // Search term for the selected filter type
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5); // Page size state

  const columns = [
    { title: 'Regional', dataIndex: 'regional', key: 'regional' },
    { title: 'Business Capability Name', dataIndex: 'businessCapability', key: 'businessCapability' },
    { title: 'Domain', dataIndex: 'domain', key: 'domain' },
    { title: 'Sub-domain', dataIndex: 'subDomain', key: 'subDomain' },
    { title: 'Application Name', dataIndex: 'application', key: 'application' },
  ];

  const data: DataItem[] = [
    { regional: 'EMEA', businessCapability: 'Finance', domain: 'Payroll', subDomain: 'Payroll Hungary', application: 'Adamentes' },
    { regional: 'APAC', businessCapability: 'Enterprise Resource Planning', domain: 'Back Office', subDomain: 'Accounting', application: 'Accent7' },
    { regional: 'APAC', businessCapability: 'Enterprise Resource Planning', domain: 'Back Office', subDomain: 'Purchase workflow & order', application: 'Accpac' },
    { regional: 'EMEA', businessCapability: 'Finance', domain: 'Payroll', subDomain: 'Payroll Hungary', application: 'ADP Payroll' },
    { regional: 'EMEA', businessCapability: 'Enterprise Resource Planning', domain: 'Back Office', subDomain: 'Inventory control', application: 'Sage 300 ERP' },
    { regional: 'AMERICAS', businessCapability: 'Finance', domain: 'Accounts', subDomain: 'Accounts Payable', application: 'QuickBooks' },
    // Add more data as needed...
  ];

  const filteredData = data.filter((item) => {
    return (
      (region ? item.regional === region : true) &&
      (search && filterType ? (item[filterType as keyof DataItem] as string).toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  const handleApply = () => {
    setCurrentPage(1);
  };

  const handleExport = () => {
    const csvContent = [
      columns.map(col => col.title).join(','), // Headers
      ...filteredData.map(row =>
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
      <Menu.Item key="5">5 items</Menu.Item>
      <Menu.Item key="10">10 items</Menu.Item>
      <Menu.Item key="20">20 items</Menu.Item>
    </Menu>
  );

  return (
    <div className="regional-report">
      <h1>Regional Report</h1>
      <p>Detailed information about <b>Regional Report</b></p>

      <div className="filters" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <Select placeholder="Regional" onChange={(value: string) => setRegion(value)} allowClear style={{ flex: 1, maxWidth: '400px', height: '45px' }}>
          <Select.Option value="AMERICAS">AMERICAS</Select.Option>
          <Select.Option value="APAC">APAC</Select.Option>
          <Select.Option value="EMEA">EMEA</Select.Option>
        </Select>

        <Select placeholder="Filter By" onChange={(value: string) => setFilterType(value)} allowClear style={{ flex: 1, maxWidth: '400px', height: '45px' }}>
          <Select.Option value="businessCapability">Business Capability</Select.Option>
          <Select.Option value="domain">Domain</Select.Option>
          <Select.Option value="subDomain">Sub-domain</Select.Option>
          <Select.Option value="application">Application Name</Select.Option>
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
        dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        rowKey="application"
      />
      
      <div className="pagination-control" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <Dropdown overlay={pageSizeMenu}>
          <div>
            Show rows: 
            <Button>
            {pageSize} items <DownOutlined />
          </Button>
          </div>
        </Dropdown>
        
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={(page: number) => setCurrentPage(page)}
          showSizeChanger={false}
          style={{ marginLeft: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Regional;