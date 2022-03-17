import React, { useEffect, useState } from "react";
import { Table, Card, Badge, Filters, Loader, Toast } from "./../../components";
import { useSortableData } from "../../customHooks/useSortableData";
import { getAllCandidatesList } from "../../apis/candidate";
import { ShareAltOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import "./index.scss";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    name: "",
    position: "",
    status: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "error" });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { items, requestSort, sortConfig, setSortConfig } =
    useSortableData(filteredData);
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    setIsLoading(true);
    getAllCandidatesList()
      .then((response) => {
        if (response.error) handleError();
        else {
          setData(response?.data);
        }
      })
      .catch((err) => handleError())
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // onRefresh we take params from url and display Data accordingly
  useEffect(() => {
    if (data) {
      setFilteredData(data);
      let key = params.get("key");
      let direction = params.get("direction");
      let name = params.get("name");
      let status = params.get("status");
      let position = params.get("position");

      if (name || status || position) {
        setFilters({ name, status, position });
      }
      filterDataFunc(filters); //->filteredData;
      let sortParams = { key, direction };
      sortParams?.key && requestSort(sortParams, true);
    }
  }, [data]);

  useEffect(() => {
    updateUrlParams(sortConfig);
  }, [sortConfig]);

  const clearUrlParams = () => {
    window.history.replaceState({ data }, "", `${window.location.pathname}`);
  };
  const updateUrlParams = (sortConfig) => {
    let newParams = {};
    filters.name && (newParams["name"] = filters.name);
    filters.status && (newParams["status"] = filters.status);
    filters.position && (newParams["position"] = filters.position);
    if (sortConfig) {
      newParams = { ...newParams, ...sortConfig };
    }
    if (Object.keys(newParams).length > 0) {
      const urlparams = new URLSearchParams(newParams);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${urlparams}`
      );
    }
  };
  //TO Do reset logic
  //auto suggest off on reload
  const filterDataFunc = (filters = {}) => {
    const filteredName = filters?.name
      ? data.filter((ele) => {
          return ele.name.toLowerCase().includes(filters.name);
        })
      : data; //ele substring partial name search
    const filteredPosition = filters?.position
      ? filteredName.filter((ele) => {
          return ele.position_applied.toLowerCase().includes(filters.position);
        })
      : filteredName;
    const filteredStatus = filters?.status
      ? filteredPosition.filter((ele) => {
          return ele.status === filters.status;
        })
      : filteredPosition;
    setCurrentPage(1);

    setFilteredData(filteredStatus);
  };

  const onReset = () => {
    setData(data);
    setCurrentPage(1);
    //useEffect won't work because of refernce equality of data obj
    setFilteredData(data);
    setFilters({
      name: "",
      position: "",
      status: "",
    });
    setSortConfig(null);
    //update this
    clearUrlParams();
    // updateUrlParams(true);
  };

  const handleError = () => {
    setToast({
      show: true,
      type: "error",
      msg: "Unable to Fetch Data from Server. Please reload or try again after some time",
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (filters.name || filters.status || filters.position) {
      updateUrlParams(sortConfig);
      filterDataFunc(filters);
    }
  };

  const inputHandler = (event) => {
    let key = event.target.name;
    let val = event.target.value;
    setFilters({ ...filters, [key]: val });
  };

  const onShareClick = () => {
    navigator.clipboard.writeText(window.location);
    setToast({
      show: true,
      type: "success",
      msg: "URL coppied to clipboard",
    });
  };

  const onDownloadClick = () => {
    if (filteredData?.length > 0) {
      let csvData = "";
      let headers = Object.keys(filteredData[0]);
      csvData += headers.join(",");
      for (let i = 0; i < filteredData.length; i++) {
        const row = Object.values(filteredData[i]);
        csvData += "\r\n" + row.join(",");
      }
      let uri = "data:text/csv;charset=utf-8," + csvData;
      let filename = "CandidatesList";
      let anchor = document.createElement("a");
      anchor.href = uri;
      anchor.style = "visibility:hidden";
      anchor.download = filename + ".csv";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setToast({
        show: true,
        type: "success",
        msg: "CSV file will be downloaded shortly",
      });
    }
  };

  return (
    <div className="App">
      <Toast
        open={toast.show}
        type={toast.type}
        message={toast.msg}
        onClose={() => {
          setToast({ show: false, msg: "", type: "" });
        }}
      />
      <Loader loading={isLoading} />
      <div>
        <Card
          header={
            <span
              style={{
                display: "flex",
                fontSize: 30,
                color: "darkblue",
              }}
            >
              Recruitment Board
            </span>
          }
          body={
            <p
              style={{
                display: "flex",
                color: "darkslateblue",
              }}
            >
              Display candidate shortlisting status and application Date
            </p>
          }
          headerStyle={{ background: "#d5f0f7" }}
        />
        {/* {Table Section} */}
        <Card
          header={
            <>
              <span className="headerStyle">
                Candidate List{" "}
                <Badge count={filteredData ? filteredData.length : 0} />
                <div
                  style={{
                    marginLeft: "80%",
                  }}
                >
                  <ShareAltOutlined
                    className="shareIcon"
                    onClick={onShareClick}
                  />
                  <CloudDownloadOutlined onClick={onDownloadClick} />
                </div>
              </span>
              <span className="shareDownload">{"Share & Download"}</span>
              <Card
                header={null}
                body={
                  <Filters
                    filters={filters}
                    inputHandler={inputHandler}
                    onSubmit={onSubmit}
                    onReset={onReset}
                    isDisabled={items?.length > 0 ? false : true}
                  />
                }
              />
            </>
          }
          body={
            <Table
              data={items}
              requestSort={requestSort}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
      </div>
    </div>
  );
}
