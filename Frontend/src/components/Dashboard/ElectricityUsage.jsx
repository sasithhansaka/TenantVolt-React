import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ElectricityUsage.module.css";
import ExplanationCards from "./ExplanationCards ";


const ElectricityUsage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const username = userData?.userInfo
    ? `${userData.userInfo.firstName} ${userData.userInfo.lastName}`
    : "Guest User";
  const userStatus = userData?.orderDetails?.orderStatus || "pending";
  const orderDate =
    userData?.orderDetails?.orderDateTime || "No date available";
  const tenants = userData?.orderDetails?.tenants || [];

  const [selectedTenant, setSelectedTenant] = useState(null);
  const [chartData, setChartData] = useState(null);

  // UI state
  const [selectedMode, setSelectedMode] = useState("hourly");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedHour, setSelectedHour] = useState("00");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  const [productId, setProductId] = useState("");

  // Options for selectors
  const [availableYears, setAvailableYears] = useState([]);

  const baseUrl =
    "https://tenantvolt-usage-api-4e86f80f2f1b.herokuapp.com/electricity";

  // Initialize date values
  useEffect(() => {
    const today = new Date();
    const formattedDate = formatDate(today);
    setSelectedDate(formattedDate);
    setSelectedYear(today.getFullYear().toString());
    setSelectedMonth(padNumber(today.getMonth() + 1));

    // Generate available years (current year and 5 previous years)
    const currentYear = today.getFullYear();
    const years = [];
    for (let i = 0; i < 6; i++) {
      years.push((currentYear - i).toString());
    }
    setAvailableYears(years);

    if (tenants.length > 0) {
      setSelectedTenant(tenants[0]);
      setProductId(tenants[0].productId);
    }
  }, []);

  const setMode = (mode) => {
    setSelectedMode(mode);
    setChartData(null);
    setHasAttemptedFetch(false);

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }
  };


  // Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleTenantChange = (e) => {
    const selectedIndex = e.target.value;
    if (selectedIndex >= 0 && selectedIndex < tenants.length) {
      const tenant = tenants[selectedIndex];
      setSelectedTenant(tenant);
      setProductId(tenant.productId);

      // Reset chart data when tenant changes
      setChartData(null);
      setHasAttemptedFetch(false);
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    }
  };

  const fetchUsageData = async () => {
    setIsLoading(true);
    setHasAttemptedFetch(true);
    setChartData(null);

    let endpoint = "";

    switch (selectedMode) {
      case "hourly":
        endpoint = `${baseUrl}/minutely/${productId}/${selectedDate}/${selectedHour}`;
        break;
      case "daily":
        endpoint = `${baseUrl}/hourly/${productId}/${selectedDate}`;
        break;
      case "monthly":
        endpoint = `${baseUrl}/daily/${productId}/${selectedYear}-${selectedMonth}`;
        break;
      case "yearly":
        endpoint = `${baseUrl}/monthly/${productId}/${selectedYear}`;
        break;
      default:
        console.error("Invalid mode selected");
        setIsLoading(false);
        return;
    }

    console.log("Fetching data from:", endpoint);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data && data.data_points && data.data_points.length > 0) {
        console.log("Received data:", data);
        setChartData(data);
        setTimeout(() => {
          renderChart();
        }, 0);
      } else {
        console.warn("No data points received or empty data array");
        setChartData(null);
      }
    } catch (error) {
      console.error("Error fetching usage data:", error);
      setChartData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chartData?.data_points?.length) {
      renderChart();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

  const renderChart = () => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart if exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = chartData.data_points.map((point) => point.label);
    const data = chartData.data_points.map((point) => point.value);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: chartData.y_axis_label,
            data: data,
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            borderColor: "#3498db",
            borderWidth: 2,
            pointBackgroundColor: "#3498db",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y.toFixed(2)} W`,
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: chartData.x_axis_label,
            },
          },
          y: {
            title: {
              display: true,
              text: chartData.y_axis_label,
            },
            ticks: {
              callback: (value) => `${value} W`,
            },
          },
        },
      },
    });
  };

  const downloadChart = () => {
    if (!chartInstance.current) return;

    const imageURL = chartRef.current.toDataURL("image/png");

    // Create download link
    const a = document.createElement("a");
    a.href = imageURL;
    a.download = `electricity-usage-${selectedMode}-${
      new Date().toISOString().split("T")[0]
    }.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const refreshData = () => {
    fetchUsageData();
  };

  const calculateAverage = () => {
    if (!chartData || chartData.data_points.length === 0) return 0;

    const sum = chartData.data_points.reduce(
      (acc, point) => acc + point.value,
      0
    );
    return sum / chartData.data_points.length;
  };

  const getPeakUsage = () => {
    if (!chartData || chartData.data_points.length === 0) return 0;

    return Math.max(...chartData.data_points.map((point) => point.value));
  };

  const getLowestUsage = () => {
    if (!chartData || chartData.data_points.length === 0) return 0;

    return Math.min(...chartData.data_points.map((point) => point.value));
  };

  // Helper function to format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = padNumber(date.getMonth() + 1);
    const day = padNumber(date.getDate());

    return `${year}-${month}-${day}`;
  };

  // Helper function to pad single digit numbers with leading zero
  const padNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  return (
    <motion.div 
    className={styles.electricityUsageContainer}
    initial="hidden"
    animate="visible"
    variants={containerVariants}
  >
    <motion.div className={styles.headerSection} variants={itemVariants}>
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Electricity Usage Monitor
      </motion.h1>
      
      <motion.div className={styles.userInfo} variants={itemVariants}>
        <div className={styles.tenantSelector}>
          <label htmlFor="tenant-select">Select Tenant:</label>
          <motion.select
            id="tenant-select"
            onChange={handleTenantChange}
            value={tenants.indexOf(selectedTenant)}
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.02 }}
          >
            {tenants.map((tenant, index) => (
              <option key={index} value={index}>
                {tenant.username || tenant.name} 
              </option>
            ))}
          </motion.select>
        </div>
        <motion.div 
          className={styles.currentSelection}
          initial={{ x: -20 }}
          animate={{ x: 0 }}
        >
          {selectedTenant ? (
            <>
              <span className={styles.username}>
                {selectedTenant.username || selectedTenant.name}
              </span> 
            </>
          ) : (
            <span className={styles.username}>No tenant selected</span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>

    <motion.div className={styles.viewModeSelector} variants={itemVariants}>
      {["hourly", "daily", "monthly", "yearly"].map((mode) => (
        <motion.div
          key={mode}
          className={`${styles.modeOption} ${
            selectedMode === mode ? styles.active : ""
          }`}
          onClick={() => setMode(mode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          <i className={`fas fa-${
            mode === "hourly" ? "clock" : 
            mode === "daily" ? "calendar-day" : 
            mode === "monthly" ? "calendar-alt" : "calendar-check"
          }`}></i>
          <span>{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
        </motion.div>
      ))}
    </motion.div>

    <motion.div className={styles.dateSelectorSection} variants={itemVariants}>
      {/* Yearly Mode */}
      <AnimatePresence>
        {selectedMode === "yearly" && (
          <motion.div 
            className={styles.dateInputs}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="year-select">Year:</label>
              <motion.select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                whileHover={{ scale: 1.02 }}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </motion.select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monthly Mode */}
      <AnimatePresence>
        {selectedMode === "monthly" && (
          <motion.div 
            className={styles.dateInputs}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="month-year-select">Year:</label>
              <select
                id="month-year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="month-select">Month:</label>
              <select
                id="month-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={padNumber(i + 1)}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Mode */}
      <AnimatePresence>
        {selectedMode === "daily" && (
          <motion.div 
            className={styles.dateInputs}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="daily-date">Date:</label>
              <input
                type="date"
                id="daily-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hourly Mode */}
      <AnimatePresence>
        {selectedMode === "hourly" && (
          <motion.div 
            className={styles.dateInputs}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="hourly-date">Date:</label>
              <input
                type="date"
                id="hourly-date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="hour-select">Hour:</label>
              <select
                id="hour-select"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                {[...Array(24)].map((_, i) => (
                  <option key={i} value={padNumber(i)}>
                    {`${padNumber(i)}:00 - ${padNumber((i + 1) % 24)}:00`}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className={styles.fetchDataBtn} 
        onClick={fetchUsageData}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="fas fa-sync"></i> Get Usage Data
      </motion.button>
    </motion.div>

    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className={styles.loadingIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.spinner}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <span>Loading data...</span>
        </motion.div>
      )}
    </AnimatePresence>

    <AnimatePresence>
      {chartData && chartData.data_points && chartData.data_points.length > 0 ? (
        <motion.div 
          className={styles.chartContainer}
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.chartHeader}>
            <h2>{chartData.chart_title}</h2>
            <div className={styles.chartActions}>
              <motion.button 
                className={styles.actionBtn} 
                onClick={downloadChart}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-download"></i>
              </motion.button>
              <motion.button 
                className={styles.actionBtn} 
                onClick={refreshData}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-redo"></i>
              </motion.button>
            </div>
          </div>
          <div className={styles.canvasWrapper}>
            <canvas ref={chartRef}></canvas>
          </div>
        </motion.div>
      ) : !chartData && hasAttemptedFetch && !isLoading ? (
        <motion.div 
          className={styles.noDataMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <i className="fas fa-chart-line"></i>
          <p>No electricity usage data available for the selected period.</p>
          <p>Please try selecting a different time range.</p>
        </motion.div>
      ) : null}
    </AnimatePresence>

    <AnimatePresence>
      {chartData && chartData.data_points && chartData.data_points.length > 0 && (
        <motion.div 
          className={styles.dataSummary}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className={styles.summaryItem}
            whileHover={{ scale: 1.03 }}
          >
            <span className={styles.label}>Average Consumption:</span>
            <span className={styles.value}>
              {calculateAverage().toFixed(2)} W
            </span>
          </motion.div>
          <motion.div 
            className={styles.summaryItem}
            whileHover={{ scale: 1.03 }}
          >
            <span className={styles.label}>Peak Usage:</span>
            <span className={styles.value}>
              {getPeakUsage().toFixed(2)} W
            </span>
          </motion.div>
          <motion.div 
            className={styles.summaryItem}
            whileHover={{ scale: 1.03 }}
          >
            <span className={styles.label}>Lowest Usage:</span>
            <span className={styles.value}>
              {getLowestUsage().toFixed(2)} W
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <motion.div 
        className={styles.billExplanation}
        variants={itemVariants}
      >
        {/* <h2 className={styles.sectionTitle} style={{marginTop:'120px'}}>Understanding Your Bill</h2> */}
        <ExplanationCards />
      </motion.div>
  </motion.div>
);
};


export default ElectricityUsage;