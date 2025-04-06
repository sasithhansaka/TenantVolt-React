import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './ElectricityUsage.module.css';

const ElectricityUsage = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    /*// State from route
    const { state } = location;
    const [username, setUsername] = useState(state?.username || 'Not Logged In');
    const [productId, setProductId] = useState(state?.productId || '');*/

    const debugUsername = "chalana";  // Set to null to use real data
    const debugProductId = "1112";  // Set to null to use real data

    const [username] = useState(
        debugUsername !== null ? debugUsername : (username || 'Not Logged In')
    );
    const [productId] = useState(
        debugProductId !== null ? debugProductId : (productId || '')
    );

    // Chart-related state
    const [chartData, setChartData] = useState(null);

    // UI state
    const [selectedMode, setSelectedMode] = useState('hourly');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedHour, setSelectedHour] = useState('00');
    const [isLoading, setIsLoading] = useState(false);
    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    // Options for selectors
    const [availableYears, setAvailableYears] = useState([]);

    const baseUrl = 'https://tenantvolt-usage-api-4e86f80f2f1b.herokuapp.com/electricity';

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

    const fetchUsageData = async () => {
        setIsLoading(true);
        setHasAttemptedFetch(true);
        setChartData(null);

        let endpoint = '';

        switch (selectedMode) {
            case 'hourly':
                endpoint = `${baseUrl}/minutely/${productId}/${selectedDate}/${selectedHour}`;
                break;
            case 'daily':
                endpoint = `${baseUrl}/hourly/${productId}/${selectedDate}`;
                break;
            case 'monthly':
                endpoint = `${baseUrl}/daily/${productId}/${selectedYear}-${selectedMonth}`;
                break;
            case 'yearly':
                endpoint = `${baseUrl}/monthly/${productId}/${selectedYear}`;
                break;
        }

        console.log('Fetching data from:', endpoint);

        try {
            const response = await fetch(endpoint);
            const data = await response.json();

            if (data && data.data_points && data.data_points.length > 0) {
                console.log('Received data:', data);
                setChartData(data);
                setTimeout(() => {
                    renderChart();
                }, 0);
            } else {
                console.warn('No data points received or empty data array');
                setChartData(null);
            }
        } catch (error) {
            console.error('Error fetching usage data:', error);
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

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy previous chart if exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const labels = chartData.data_points.map(point => point.label);
        const data = chartData.data_points.map(point => point.value);

        chartInstance.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: chartData.y_axis_label,
                    data: data,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderColor: '#3498db',
                    borderWidth: 2,
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.parsed.y.toFixed(2)} W`
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: chartData.x_axis_label
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: chartData.y_axis_label
                        },
                        ticks: {
                            callback: (value) => `${value} W`
                        }
                    }
                }
            }
        });
    };

    const downloadChart = () => {
        if (!chartInstance.current) return;

        const imageURL = chartRef.current.toDataURL('image/png');

        // Create download link
        const a = document.createElement('a');
        a.href = imageURL;
        a.download = `electricity-usage-${selectedMode}-${new Date().toISOString().split('T')[0]}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const refreshData = () => {
        fetchUsageData();
    };

    const calculateAverage = () => {
        if (!chartData || chartData.data_points.length === 0) return 0;

        const sum = chartData.data_points.reduce((acc, point) => acc + point.value, 0);
        return sum / chartData.data_points.length;
    };

    const getPeakUsage = () => {
        if (!chartData || chartData.data_points.length === 0) return 0;

        return Math.max(...chartData.data_points.map(point => point.value));
    };

    const getLowestUsage = () => {
        if (!chartData || chartData.data_points.length === 0) return 0;

        return Math.min(...chartData.data_points.map(point => point.value));
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
        return num.toString().padStart(2, '0');
    };

    return (
        <>
            <div className={styles.electricityUsageContainer}>
                <div className={styles.headerSection}>
                    <h1>Electricity Usage Monitor</h1>
                    <div className={styles.userInfo}>
                        <span className={styles.username}>{username}</span> | <span className={styles.productId}>Device: {productId}</span>
                    </div>
                </div>

                <div className={styles.viewModeSelector}>
                    <div
                        className={`${styles.modeOption} ${selectedMode === 'hourly' ? styles.active : ''}`}
                        onClick={() => setMode('hourly')}
                    >
                        <i className="fas fa-clock"></i>
                        <span>Hourly</span>
                    </div>
                    <div
                        className={`${styles.modeOption} ${selectedMode === 'daily' ? styles.active : ''}`}
                        onClick={() => setMode('daily')}
                    >
                        <i className="fas fa-calendar-day"></i>
                        <span>Daily</span>
                    </div>
                    <div
                        className={`${styles.modeOption} ${selectedMode === 'monthly' ? styles.active : ''}`}
                        onClick={() => setMode('monthly')}
                    >
                        <i className="fas fa-calendar-alt"></i>
                        <span>Monthly</span>
                    </div>
                    <div
                        className={`${styles.modeOption} ${selectedMode === 'yearly' ? styles.active : ''}`}
                        onClick={() => setMode('yearly')}
                    >
                        <i className="fas fa-calendar-check"></i>
                        <span>Yearly</span>
                    </div>
                </div>

                <div className={styles.dateSelectorSection}>
                    {/* Yearly Mode - Year selection */}
                    {selectedMode === 'yearly' && (
                        <div className={styles.dateInputs}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="year-select">Year:</label>
                                <select
                                    id="year-select"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Monthly Mode - Year and Month selection */}
                    {selectedMode === 'monthly' && (
                        <div className={styles.dateInputs}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="month-year-select">Year:</label>
                                <select
                                    id="month-year-select"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    {availableYears.map(year => (
                                        <option key={year} value={year}>{year}</option>
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
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Daily Mode - Full Date selection */}
                    {selectedMode === 'daily' && (
                        <div className={styles.dateInputs}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="daily-date">Date:</label>
                                <input
                                    type="date"
                                    id="daily-date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Hourly Mode - Date and Hour selection */}
                    {selectedMode === 'hourly' && (
                        <div className={styles.dateInputs}>
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
                                    <option value="00">00:00 - 01:00</option>
                                    <option value="01">01:00 - 02:00</option>
                                    <option value="02">02:00 - 03:00</option>
                                    <option value="03">03:00 - 04:00</option>
                                    <option value="04">04:00 - 05:00</option>
                                    <option value="05">05:00 - 06:00</option>
                                    <option value="06">06:00 - 07:00</option>
                                    <option value="07">07:00 - 08:00</option>
                                    <option value="08">08:00 - 09:00</option>
                                    <option value="09">09:00 - 10:00</option>
                                    <option value="10">10:00 - 11:00</option>
                                    <option value="11">11:00 - 12:00</option>
                                    <option value="12">12:00 - 13:00</option>
                                    <option value="13">13:00 - 14:00</option>
                                    <option value="14">14:00 - 15:00</option>
                                    <option value="15">15:00 - 16:00</option>
                                    <option value="16">16:00 - 17:00</option>
                                    <option value="17">17:00 - 18:00</option>
                                    <option value="18">18:00 - 19:00</option>
                                    <option value="19">19:00 - 20:00</option>
                                    <option value="20">20:00 - 21:00</option>
                                    <option value="21">21:00 - 22:00</option>
                                    <option value="22">22:00 - 23:00</option>
                                    <option value="23">23:00 - 00:00</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <button className={styles.fetchDataBtn} onClick={fetchUsageData}>
                        <i className="fas fa-sync"></i> Get Usage Data
                    </button>
                </div>

                {chartData && chartData.data_points && chartData.data_points.length > 0 && (
                    <div className={styles.chartContainer}>
                        <div className={styles.chartHeader}>
                            <h2>{chartData.chart_title}</h2>
                            <div className={styles.chartActions}>
                                <button className={styles.actionBtn} onClick={downloadChart}>
                                    <i className="fas fa-download"></i>
                                </button>
                                <button className={styles.actionBtn} onClick={refreshData}>
                                    <i className="fas fa-redo"></i>
                                </button>
                            </div>
                        </div>
                        <div className={styles.canvasWrapper}>
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </div>
                )}

                {!chartData && hasAttemptedFetch && !isLoading && (
                    <div className={styles.noDataMessage}>
                        <i className="fas fa-chart-line"></i>
                        <p>No electricity usage data available for the selected period.</p>
                        <p>Please try selecting a different time range.</p>
                    </div>
                )}

                {isLoading && (
                    <div className={styles.loadingIndicator}>
                        <div className={styles.spinner}></div>
                        <span>Loading data...</span>
                    </div>
                )}

                {chartData && chartData.data_points && chartData.data_points.length > 0 && (
                    <div className={styles.dataSummary}>
                        <div className={styles.summaryItem}>
                            <span className={styles.label}>Average Consumption:</span>
                            <span className={styles.value}>{calculateAverage().toFixed(2)} W</span>
                        </div>
                        <div className={styles.summaryItem}>
                            <span className={styles.label}>Peak Usage:</span>
                            <span className={styles.value}>{getPeakUsage().toFixed(2)} W</span>
                        </div>
                        <div className={styles.summaryItem}>
                            <span className={styles.label}>Lowest Usage:</span>
                            <span className={styles.value}>{getLowestUsage().toFixed(2)} W</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ElectricityUsage;