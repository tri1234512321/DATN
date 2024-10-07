import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Row,
  Select,
  Typography,
} from "antd";
import { Column, Pie, Line } from "@ant-design/plots";
import { DollarCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../context/authContext";
import { makeRequest } from "../../../components/Social/axios";

const ManageRevenue = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data: revenue } = useQuery(
    ["revenue", currentUser.user.id],
    () =>
      makeRequest.get("/get-revenue", {
        params: { access_token: currentUser.access_token },
      }).then((res) => res.data.item || []), // Default to an empty array if item is null
    {
      refetchOnWindowFocus: false,
    }
  );

  const [revenueFood, setRevenueFood] = useState([]);
  const [revenueStatus, setRevenueStatus] = useState([]);
	const [revenueStatus2, setRevenueStatus2] = useState([]);

  const calculateMonthlyTotalByStatus = (data) => {
    const monthlyTotals = {};

    data.forEach(item => {
      if (["FINISH", "RETURNED"].includes(item.status)) {
        const date = new Date(item.createdAt);
        const key = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM
        const total = parseInt(item.price) * item.amount;

        // Initialize the month if not present
        if (!monthlyTotals[key]) {
          monthlyTotals[key] = [];
        }

        // Find status index and update totals
        const statusIndex = monthlyTotals[key].findIndex(entry => entry.status === item.status);
        if (statusIndex === -1) {
          monthlyTotals[key].push({ status: item.status, total });
        } else {
          monthlyTotals[key][statusIndex].total += total;
        }
      }
			console.log(monthlyTotals);
    });

    // Flatten results
    return Object.entries(monthlyTotals).flatMap(([key, statusTotals]) =>
      statusTotals.map(({ status, total }) => ({
        month: key,
        status,
        total,
      }))
    );
  };

  useEffect(() => {
    if (revenue && Array.isArray(revenue)) { // Check if revenue is an array
      const totalsByFood = revenue.reduce((acc, { foodName, price, amount }) => {
        const totalPrice = Number(price) * amount;
        acc[foodName] = (acc[foodName] || 0) + totalPrice;
        return acc;
      }, {});

      const transformedFoodData = Object.entries(totalsByFood).map(([foodName, total]) => ({
        source: foodName,
        value: total,
      }));

      console.log(transformedFoodData);
      setRevenueFood(transformedFoodData);
    }
  }, [revenue]);

  useEffect(() => {
    // Check if revenue is an array
    if (Array.isArray(revenue)) {
        // Calculate monthly totals by status
        const monthlyTotalsByStatus = calculateMonthlyTotalByStatus(revenue);
        
        // Transform the results into the desired format
        const transformedStatusData = monthlyTotalsByStatus.map(({ month, status, total }) => ({
            month: `Tháng ${month.split("-")[1]}`, // Extract month for display
            type: status === "RETURNED" ? "Trả hàng" : "Bán được", // Map status to type
            value: total,
        }));

        console.log(revenue.length); // Log the length of revenue array
        setRevenueStatus(transformedStatusData); // Update state with transformed data
    } else {
        setRevenueStatus([]); // Reset in case revenue is not an array
    }
}, [revenue]);

	useEffect(() => {
		if (Array.isArray(revenue)) { // Check if revenue is an array
			const monthlyTotalsByStatus = calculateMonthlyTotalByStatus(revenue);
			const transformedStatusData = monthlyTotalsByStatus
				.filter(({ status }) => status !== "RETURNED") // Exclude 'Trả hàng'
				.map(({ month, status, total }) => ({
					month: `Tháng ${month.split("-")[1]}`, // Extract month for display
					type: status === "RETURNED" ? "Trả hàng" : "Bán được", // Map status to type
					value: total,
				}));
	
			setRevenueStatus2(transformedStatusData);
		} else {
			setRevenueStatus2([]); // Reset in case revenue is not an array
		}
	}, [revenue]);

  // Column chart configuration
  const configColumn = {
    data: revenueStatus, // Use revenueStatus here
    isGroup: false,
    xField: "month",
    yField: "value",
    seriesField: "type",
    legend: {
      position: "top-left",
    },
    colorField: "type",
    color: ["#1979C9", "#D62A0D"],
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1000000).toFixed(0)}M`,
      },
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 0.3,
      },
    },
    tooltip: {
      shared: false,
    },
  };

  // Pie chart configuration
  const configPie = {
    appendPadding: 10,
    data: revenueFood, // Use revenueFood here
    angleField: "value",
    colorField: "source",
    radius: 0.9,
    label: {
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  // Line chart configuration
  const lineData = [
    { year: "2018", revenue: 120000000 },
    { year: "2019", revenue: 150000000 },
    { year: "2020", revenue: 170000000 },
    { year: "2021", revenue: 210000000 },
    { year: "2022", revenue: 250000000 },
  ];

  const configLine = {
    data: revenueStatus2,
    xField: "month",
    yField: "value",
    label: {
      style: {
        fill: "#000",
      },
    },
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1000000).toFixed(0)}M`, // Display in millions
      },
    },
    tooltip: {
      shared: true,
    },
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <Typography.Title level={4}>
        Báo cáo doanh số bán hàng
      </Typography.Title>

      {/* <Divider />

      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="filter" label="Bộ lọc">
              <Select className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="fromDate" label="Từ ngày">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="toDate" label="Đến ngày">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label=" ">
              <Button type="primary">Tìm kiếm</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />

      <div className="flex justify-between mb-5">
        <Card>
          <div className="flex">
            <DollarCircleFilled style={{ fontSize: 30, color: "#b4e79a" }} />
            <div className="pl-3">
              <p className="text-base font-bold">285.961.000</p>
              <p className="text-sm">Doanh thu</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex">
            <DollarCircleFilled style={{ fontSize: 30, color: "#ee4d2d" }} />
            <div className="pl-3">
              <p className="text-base font-bold">85.961.000</p>
              <p className="text-sm">Tổng vốn</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex">
            <DollarCircleFilled style={{ fontSize: 30 }} />
            <div className="pl-3">
              <p className="text-base font-bold">285.961.000</p>
              <p className="text-sm">Trả hàng</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex">
            <DollarCircleFilled style={{ fontSize: 30, color: "#035590" }} />
            <div className="pl-3">
              <p className="text-base font-bold">285.961.000</p>
              <p className="text-sm">Lợi nhuận</p>
            </div>
          </div>
        </Card>
      </div> */}

      <Divider />

      <Card title="Mức doanh thu & tiền vốn theo tháng">
        <Column {...configColumn} />
      </Card>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Số lượng đặt hàng từ các nguồn">
            <Pie {...configPie} /> {/* Biểu đồ tròn */}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Mức tăng doanh thu từng năm">
            <Line {...configLine} /> {/* Biểu đồ đường */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManageRevenue;
