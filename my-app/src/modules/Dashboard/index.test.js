import { render, screen } from "@testing-library/react";
import { cleanup, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import candidateApi from "./../../apis/axiosInstances/CandidateService";
import Dashboard from "./index";
import { mockData as data } from "../../utils/constants";

const flushPromises = async (timeout = 0) =>
  await act(
    async () => await new Promise((resolve) => setTimeout(resolve, timeout))
  );
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

jest.mock("../../apis/axiosInstances/CandidateService.js", () => {
  return {
    get: jest.fn(),
  };
});

describe("Testing Dashboard Page and functionality", () => {
  it("renders Dashboard component and check Filters functionality", async () => {
    candidateApi.get.mockResolvedValue({ data });

    const { container, getByLabelText, getByText } = render(<Dashboard />);
    await flushPromises(50);

    //basic UI component visibilty check
    expect(getByText("Recruitment Board")).toBeInTheDocument();
    expect(getByText("Candidate List")).toBeInTheDocument();

    const submit = container.querySelector("input[type='submit']");
    const reset = container.querySelector("input[type='reset']");
    const [download] = container.getElementsByClassName(
      "anticon-cloud-download"
    );
    expect(submit).toBeInTheDocument();
    expect(reset).toBeInTheDocument();
    expect(download).toBeInTheDocument();

    //Share&Download Action
    fireEvent.click(download);
    await flushPromises(50);

    //Check Filter fucntionality by filtering by Name & Download CSV action
    expect(screen.queryByText("Colette Morar")).toBeInTheDocument();
    const inputName = getByLabelText("Name:");
    const inputPosition = getByLabelText("Position Applied:");

    fireEvent.change(inputName, { target: { value: "Alvin Satterfield" } });
    fireEvent.change(inputPosition, { target: { value: "Technician" } });
    fireEvent.click(submit);
    await flushPromises(50);
    expect(screen.queryByText("Colette Morar")).not.toBeInTheDocument();

    //reset functionality;
    fireEvent.click(reset);
    await flushPromises(50);
    expect(screen.queryByText("Colette Morar")).toBeInTheDocument();
  });

  it("check Sorting functionality", async () => {
    candidateApi.get.mockResolvedValue({ data });

    const { container } = render(<Dashboard />);
    await flushPromises(50);

    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
    const thead = table.querySelector("thead");
    expect(thead).toBeInTheDocument();
    const headers = thead.querySelectorAll("th");
    expect(headers.length).toEqual(8);
    const tbody = table.querySelector("tbody");
    expect(tbody.rows.length).toEqual(10);

    //Before sorting First row data is of Alvin
    let td = tbody.querySelectorAll("tr")[0].querySelectorAll("td")[1];
    expect(td.innerHTML).toEqual("Alvin Satterfield");
    //sort by Position [Alvin-> Techician  , Colette->designer ]
    const position_applied = screen.getByText("Position Applied");
    fireEvent.click(position_applied);
    await flushPromises(50);
    td = tbody.querySelectorAll("tr")[0].querySelectorAll("td")[1];
    expect(td.innerHTML).toEqual("Colette Morar");

    //now descending order will again make Alvin as first row
    fireEvent.click(position_applied);
    await flushPromises(50);
    td = tbody.querySelectorAll("tr")[0].querySelectorAll("td")[1];
    expect(td.innerHTML).toEqual("Alvin Satterfield");
  });

  it("should render no Data in case of Api Failure", async () => {
    candidateApi.get.mockRejectedValue({
      response: {
        status: 404,
        messages: ["Not Found"],
      },
    });

    const { container, getByLabelText, getByText } = render(<Dashboard />);
    await flushPromises(50);
    expect(getByText("Recruitment Board")).toBeInTheDocument();
    expect(getByText("Candidate List")).toBeInTheDocument();
    expect(getByText("NO DATA")).toBeInTheDocument();
  });

  it("should render Tabular Data with Pagination", async () => {
    candidateApi.get.mockResolvedValue({ data });

    const { container, getByText } = render(<Dashboard />);
    await flushPromises(50);
    expect(getByText("Recruitment Board")).toBeInTheDocument();
    expect(getByText("Candidate List")).toBeInTheDocument();

    const pageList = container.querySelector("ul");
    expect(pageList).toBeInTheDocument();
    const list = pageList.querySelectorAll("li");
    // list =>    < , 1, 2, >
    expect(list.length).toEqual(4);

    //Page 2 have only two rows
    fireEvent.click(list[2]);
    await flushPromises(50);

    const table = container.querySelector("table");
    expect(table).toBeInTheDocument();
    const tbody = table.querySelector("tbody");
    expect(tbody.rows.length).toEqual(2);
  });
});
