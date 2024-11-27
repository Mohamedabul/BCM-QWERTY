import React, { useEffect, useState } from "react";
import { Table, Input, Button, Select,  Menu } from "antd";
import { DownloadOutlined } from "@mui/icons-material";
import { DownOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import { getReportData, getReportExport,getRegions, getCountrys } from "apis";
import { TablePagination } from "@mui/material";

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
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectType, setSelectType] = useState<string>("global"); // New state for Select Type filter
  const [region, setRegion] = useState<string>("");
  const [filterType, setFilterType] = useState<string>(""); // New state for filter type
  const [search, setSearch] = useState<string>(""); // Search term for the selected filter type
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // Page size state
  const [data, setData] = useState<any>([]);
  const [regions, setRegions] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
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
        ...(selectedRegions.length > 0 && selectType === "Regional" ? { region: selectedRegions } : {}),
        ...(selectedCountries.length > 0 && selectType === "Country" ? { country: selectedCountries } : {}),
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
    // setData(data?.response);
    // setTotalData(data?.totalCount);
    const processedData = data?.response.map((item: DataItem) => ({
      country: item.country === "empty" || !item.country ? "-" : item.country,
      region: item.region === "empty" || !item.region ? "-" : item.region, 
      cap: item.cap || "-", 
      domain: item.domain || "-", 
      subdomain: item.subdomain || "-", 
      name: item.name || "-", 
      business_owner: item.business_owner || "-", 
    }));
    if(selectType === "global"){
      setData(processedData || []); 
    }else{
      setData(processedData.filter((e:any) => e.region !== "Global") || []);
    }
    setTotalData(data?.totalCount || 0);

  };

  const fetchRegions = async () => {
    try {
      const regionsData = await getRegions();
      const filteredRegions = regionsData?.filter(
        (region: any) => region.name && region.name.trim() !== "empty"
      );
      console.log(filteredRegions);
      setRegions(filteredRegions.filter((e:any) => e.name !== "Global") || []);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }

  };

  const fetchCountries = async () => {
    try {
      const countriesData = await getCountrys();
      const filteredCountries = countriesData?.filter(
        (country: any) => country.name && country.name.trim() !== "empty"
      );
      setCountries(filteredCountries.filter((e:any) => e.name !== "Global") || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getExport = async () => {
    const body = JSON.stringify(getFilters());
    const data = await getReportExport(body);
    console.log(data);
    saveAs(data?.csvUrl,"export.csv");
  }

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };
  useEffect(() => {
    fetchData();
  }, [pageSize,currentPage]);

  const handleApply = () => {
    fetchData();
  };

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
          <Select.Option value="global">Global</Select.Option>
          <Select.Option value="Regional">Regional</Select.Option>
          <Select.Option value="Country">Country</Select.Option>
        </Select>


        {selectType === "Regional" && (
          <Select
            mode="multiple"
            placeholder="Select Regions"
            onFocus={fetchRegions}
            onChange={(values: string[]) => setSelectedRegions(values)}
            allowClear
            style={{ flex: 1, maxWidth: "300px", height: "45px" }}
          >
            {regions.map((region: any) => (
              <Select.Option key={region.id} value={region.name}>
                {region.name}
              </Select.Option>
            ))}
          </Select>
        )}

        {selectType === "Country" && (
          <Select
            mode="multiple"
            placeholder="Select Countries"
            onFocus={fetchCountries}
            onChange={(values: string[]) => setSelectedCountries(values)}
            allowClear
            style={{ flex: 1, maxWidth: "300px", height: "45px" }}
          >
            {countries.map((country: any) => (
              <Select.Option key={country.id} value={country.name}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        )}



        {/* {selectType === "Regional" && (
          <Select
            placeholder="Region"
            onFocus={fetchRegions} 
            onChange={(value: string) => setRegion(value)}
            allowClear
            style={{ flex: 1, maxWidth: "300px", height: "45px" }}
          >
            {regions.map((region: any) => (
              <Select.Option key={region.id} value={region.name}>
                {region.name}
              </Select.Option>
            ))}
          </Select>
        )}
        {selectType === "Country" && (
          <Select
            placeholder="Country"
            onFocus={fetchCountries} 
            onChange={(value: string) => setRegion(value)}
            allowClear
            style={{ flex: 1, maxWidth: "300px", height: "45px" }}
          >
            {countries.map((country: any) => (
              <Select.Option key={country.id} value={country.name}>
                {country.name}
              </Select.Option>
            ))}
          </Select>
        )} */}



        {/* {selectType !== "global" && (
          <Select
            placeholder={selectType === "Regional" ? "Regional" : "Country"}
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
        <Button icon={<DownloadOutlined />} onClick={getExport}>
          Export
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

  <TablePagination
  component="div"
  count={totalData}
  page={currentPage - 1}
  onPageChange={(event, newPage) => {
    setCurrentPage(newPage + 1);
  }}
  rowsPerPage={pageSize}
  onRowsPerPageChange={(event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }}
  rowsPerPageOptions={[10, 50, 100]}
  labelDisplayedRows={({ from, to, count, page }) =>
    `Page ${page + 1} of ${Math.ceil(count / pageSize)} (${count})`
  }
  sx={{ marginTop: 2 }}
  />

      {/* <div
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
      </div> */}
    </div>
  );
};

export default Report;
