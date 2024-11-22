import React, { useEffect, useState } from "react";
import { Table, Input, Button, Select, Pagination, Dropdown, Menu } from "antd";
import { DownloadOutlined } from "@mui/icons-material";
import { DownOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { getReportData, getReportExport } from "apis";

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
  const [selectType, setSelectType] = useState<string>("global"); // New state for Select Type filter
  const [region, setRegion] = useState<string>("");
  const [filterType, setFilterType] = useState<string>(""); // New state for filter type
  const [search, setSearch] = useState<string>(""); // Search term for the selected filter type
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // Page size state
  const [data, setData] = useState<any>([]);
  const [totalData, setTotalData] = useState<number>(0);

  const columns = [
    { title: "Location", dataIndex: "country", key: "type" }, // Added Type column
    { title: "Region", dataIndex: "region", key: "regional" },
    {
      title: "Business Capability Name",
      dataIndex: "cap",
      key: "businessCapability",
    },
    { title: "Domain", dataIndex: "domain", key: "domain" },
    { title: "Sub-domain", dataIndex: "subdomain", key: "subDomain" },
    { title: "Application Name", dataIndex: "name", key: "name" },
  ];

  const getFilters = () => {
    return {
      filter: {
        ...(region ? { region } : {}),
        reportType: selectType,
        ...(search ? { [filterType]: search } : {}),
      },
      page: currentPage,
      limit: pageSize,
    };
  };

  const fetchData = async () => {
    const body = JSON.stringify(getFilters());
    const data = await getReportData(body);
    setData(data?.response);
    setTotalData(data?.totalCount);
  };

  const getExport = async () => {
    const body = JSON.stringify(getFilters());
    const data = await getReportExport(body);
    console.log(data);
    saveAs(data?.csvUrl,"export.csv");
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    fetchData();
  }, [pageSize,currentPage]);

  const handleApply = () => {
    fetchData();
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
      <div
        className="filters"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <Select
          placeholder="Select Type"
          onChange={(value: string) => setSelectType(value)}
          allowClear
          style={{ flex: 1, maxWidth: "300px", height: "45px" }}
          value={selectType}
        >
          <Select.Option value="Regional">Regional</Select.Option>
          <Select.Option value="global">Global</Select.Option>
          <Select.Option value="Country">Country</Select.Option>
        </Select>

        {/* {selectType !== "global" && (
          <Select
            placeholder="Regional"
            onChange={(value: string) => setRegion(value)}
            allowClear
            style={{ flex: 1, maxWidth: "300px", height: "45px" }}
          >
            <Select.Option value="AMERICAS">AMERICAS</Select.Option>
            <Select.Option value="APAC">APAC</Select.Option>
            <Select.Option value="EMEA">EMEA</Select.Option>
          </Select>
        )} */}

        <Select
          placeholder="Filter By"
          onChange={(value: string) => setFilterType(value)}
          allowClear
          style={{ flex: 1, maxWidth: "300px", height: "45px" }}
        >
          {columns
            .filter(
              (col) => col.dataIndex !== "region" && col.dataIndex !== "country"
            )
            .map((col) => (
              <Select.Option key={col.dataIndex} value={col.dataIndex}>
                {col.title}
              </Select.Option>
            ))}
        </Select>

        <Input
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          style={{ flex: 2, maxWidth: "500px", padding: "10px" }}
        />
        <Button
          type="primary"
          onClick={handleApply}
          style={{ flex: "none", padding: "20px" }}
        >
          Apply
        </Button>
      </div>

      <div
        className="table-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div></div> {/* Empty div to push export button to the right */}
        <Button icon={<DownloadOutlined />} onClick={getExport}>
          Export
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="application"
        pagination={false}
        scroll={{
          y: 400,
          x: 'max-content',
        }}
      />

      <div
        className="pagination-control"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <Dropdown overlay={pageSizeMenu}>
          <Button>
            Show rows: {pageSize} <DownOutlined />
          </Button>
        </Dropdown>

        <Pagination
          current={currentPage}
          total={totalData}
          pageSize={pageSize}
          onChange={handlePageChange}
          showTotal={(total, range) => `${total} items`}
          showSizeChanger={false}
          style={{ marginLeft: "auto" }}
        />
      </div>
    </div>
  );
};

export default Report;
