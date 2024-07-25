import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import TaskCard from "views/admin/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { useGetOrdersQuery } from "store/services/orders";
import { useEffect, useState } from "react";
import { Card, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import InputField from "components/fields/InputField";

const Dashboard = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    ccDigits: "",
    phone: "",
    zip: "",
    firstName: "",
    lastName: "",
  });
  const { data, error, isLoading } = useGetOrdersQuery(queryParams);
  const [tableData, setTableData] = useState([]);

  const columnsDataCheck = [
    {
      Header: "First Name",
      accessor: "shippingFirstName",
    },
    {
      Header: "Last Name",
      accessor: "shippingLastName",
    },
    {
      Header: "Customer Email",
      accessor: "emailAddress",
    },
    {
      Header: "Shipping Address",
      accessor: "shippingAddress",
    },
    {
      Header: "Shipping City",
      accessor: "shippingCity",
    },
    {
      Header: "Shipping Zip",
      accessor: "shippingZip",
    },
    {
      Header: "Phone Number",
      accessor: "phone",
    },
    {
      Header: "Payment Type",
      accessor: "paymentType",
    },
    {
      Header: "Credit Card Number",
      accessor: "creditCardNumber",
    },
    {
      Header: "Credit Card Expiration",
      accessor: "creditCardExpiration",
    },
    {
      Header: "Credit Card CVV",
      accessor: "creditCardCVV",
    },
    {
      Header: "Status",
      accessor: "status",
    },
  ];

  useEffect(() => {
    if (data) {
      setTableData(data?.data);
    }
  }, [data]);

  return (
    <div>
      {/* Card widget */}

      {/* <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        />
      </div> */}

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      <Card
        extra={"w-full h-full sm:overflow-auto px-6"}
        className="mt-10 mb-5 px-5 py-5"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
          <InputField
            variant="auth"
            extra="mb-3"
            label="First Name"
            placeholder="john"
            id="firstName"
            type="text"
            value={queryParams.firstName}
            onChange={(value) =>
              setQueryParams((prev) => ({
                ...prev,
                firstName: value,
              }))
            }
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Last Name"
            placeholder="doe"
            id="lastName"
            type="text"
            value={queryParams.lastName}
            onChange={(value) =>
              setQueryParams((prev) => ({ ...prev, lastName: value }))
            }
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Phone Number"
            placeholder="12345678"
            id="phoneNumber"
            type="text"
            value={queryParams.phone}
            onChange={(value) =>
              setQueryParams((prev) => ({ ...prev, phone: value }))
            }
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Zip"
            placeholder="1234"
            id="zip"
            type="text"
            value={queryParams.zip}
            onChange={(value) =>
              setQueryParams((prev) => ({ ...prev, zip: value }))
            }
          />
          <InputField
            variant="auth"
            extra="mb-3"
            label="Credit Card"
            placeholder="123456"
            id="creditCard"
            type="text"
            value={queryParams.ccDigits}
            onChange={(value) =>
              setQueryParams((prev) => ({ ...prev, ccDigits: value }))
            }
          />
          {queryParams.firstName ||
          queryParams.lastName ||
          queryParams.phone ||
          queryParams.zip ||
          queryParams.ccDigits ? (
            <div
              className="flex cursor-pointer items-center text-red-500"
              onClick={() =>
                setQueryParams({
                  page: 1,
                  limit: 10,
                  ccDigits: "",
                  phone: "",
                  zip: "",
                  firstName: "",
                  lastName: "",
                })
              }
            >
              <h3>X Clear</h3>
            </div>
          ) : null}
        </div>
      </Card>

      <div>
        {isLoading ? (
          <Stack className="mt-10">
            <Skeleton height="20px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Stack>
        ) : (
          <>
            <CheckTable columnsData={columnsDataCheck} tableData={tableData} />
            <div className="align-items-end flex justify-end">
              <button
                onClick={() =>
                  setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }))
                }
                className="me-3"
                disabled={queryParams.page === 1}
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }))
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}

        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
