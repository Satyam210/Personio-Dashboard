import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "../Pagination";
import Tag from "../Tag";
import { SortAscendingOutlined } from "@ant-design/icons";
import { headerArr } from "../../utils/constants";
import "./index.css";

let PageSize = 10;
const Table = ({ data, requestSort, currentPage, setCurrentPage }) => {
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    updateCurrentPageData(data);
  }, [currentPage, data]);

  const updateCurrentPageData = (data) => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setCurrentPageData(data?.slice(firstPageIndex, lastPageIndex));
  };

  const sortColumn = (value) => {
    requestSort(value);
    updateCurrentPageData(data);
  };

  return (
    <div className={"tableContainer"}>
      <div>
        {
          <table>
            <thead>
              <tr>
                {headerArr.map(({ key, value }) => {
                  return [
                    "position_applied",
                    "year_of_experience",
                    "application_date",
                  ].includes(value) ? (
                    <th key={key} onClick={() => sortColumn(value)}>
                      {key}
                      <SortAscendingOutlined style={{ marginLeft: 5 }} />
                    </th>
                  ) : (
                    <th key={key}>{key}</th>
                  );
                })}
              </tr>
            </thead>
            {currentPageData?.length ? (
              <tbody>
                {currentPageData.map((row, id) => {
                  return (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.birth_date}</td>
                      <td>{row.position_applied}</td>
                      <td>{row.year_of_experience}</td>
                      <td>{row.application_date}</td>
                      <td>
                        <Tag
                          value={row.status}
                          colorStyle={{
                            color:
                              row.status === "rejected"
                                ? "red"
                                : row.status === "waiting"
                                ? "orange"
                                : "green",
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody className="noData">NO DATA</tbody>
            )}
          </table>
        }
      </div>
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

Table.prototype = {
  data: PropTypes.array,
  requestSort: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
export default Table;
