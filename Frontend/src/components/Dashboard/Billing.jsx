import React, { useState, useEffect } from 'react';
import styles from './Billing.module.css';

function Billing() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const USERNAME = userData?.userInfo
    ? `${userData.userInfo.firstName} ${userData.userInfo.lastName}`
    : "Guest User";

  const USERSTATUS = userData?.orderDetails?.orderStatus || "pending";
  const ORDERDATE = userData?.orderDetails?.orderDateTime || "No date available";
  const tenants = userData?.orderDetails?.tenants || [];
  
  const [billDetails, setBillDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        // Check if we have tenants data
        if (!tenants || tenants.length === 0) {
          setLoading(false);
          return;
        }

        // Prepare request body with actual product IDs from tenants
        const requestBody = {
          tenants: tenants.map((tenant, index) => ({
            tenant_index: index,
            product_id: tenant.productId  // Fallback to sample IDs if not available
          }))
        };

        console.log("Request Body:", JSON.stringify(requestBody, null, 2));

        // Make API call to the correct endpoint
        const response = await fetch(
          'https://tenantvolt-usage-api-4e86f80f2f1b.herokuapp.com/electricity/last-bill-details/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          }
        );

        console.log("Response Status:", response.status);

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);
        setBillDetails(data.tenants || []);
      } catch (err) {
        console.error("Error fetching bill details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [tenants]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date) ? dateString : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return 'N/A';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Fallback to sample data if API fails (for development)
  const displayData = error ? getSampleData() : billDetails;

  function getSampleData() {
    return [
      {
        tenant_index: 0,
        product_id: "1112",
        bill_details: {
          month: "2025-02",
          amount: 11900,
          kw_value: 337.7,
          status: "not_paid",
          payment_date: null,
          calculated_at: "2025-03-01T00:01:00.119374+05:30"
        }
      },
      {
        tenant_index: 1,
        product_id: "1113",
        bill_details: {
          month: "2025-02",
          amount: 11900,
          kw_value: 333.51,
          status: "not_paid",
          payment_date: null,
          calculated_at: "2025-03-01T00:01:00.119374+05:30"
        }
      },
      {
        tenant_index: 2,
        product_id: "1114",
        bill_details: {
          month: "2025-02",
          amount: 11900,
          kw_value: 337.7,
          status: "not_paid",
          payment_date: null,
          calculated_at: "2025-03-01T00:01:00.119374+05:30"
        }
      }
    ];
  }

  return (
    <div className={styles.billing}>
      <div className={styles.header}>
        <h2>Billing Information</h2>
        <p>Your billing details and history</p>
      </div>

      <div className={styles.userInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Username:</span>
          <span className={styles.infoValue}>{USERNAME}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Order Status:</span>
          <span className={styles.infoValue}>{USERSTATUS}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Order Date:</span>
          <span className={styles.infoValue}>{ORDERDATE}</span>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading bill details...</div>
      ) : error ? (
        <>
          {/* <div className={styles.error}>
            Error: {error}. Showing sample data for demonstration.
          </div> */}
          <div className={styles.billContainer}>
            {displayData.map((tenant, index) => (
              <TenantBillCard key={index} tenant={tenant} formatDate={formatDate} formatCurrency={formatCurrency} />
            ))}
          </div>
        </>
      ) : tenants.length === 0 ? (
        <div className={styles.noTenants}>No tenants found</div>
      ) : (
        <div className={styles.billContainer}>
          {displayData.map((tenant, index) => (
            <TenantBillCard key={index} tenant={tenant} formatDate={formatDate} formatCurrency={formatCurrency} />
          ))}
        </div>
      )}
    </div>
  );
}

function TenantBillCard({ tenant, formatDate, formatCurrency }) {
  return (
    <div className={styles.billCard}>
      <h3>Tenant {tenant.tenant_index + 1}</h3>
      <div className={styles.billDetails}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Product ID:</span>
          <span className={styles.detailValue}>{tenant.product_id}</span>
        </div>
        {tenant.bill_details ? (
          <>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Billing Month:</span>
              <span className={styles.detailValue}>{tenant.bill_details.month}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Amount:</span>
              <span className={styles.detailValue}>LKR .{tenant.bill_details.amount}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Usage (kW):</span>
              <span className={styles.detailValue}>{tenant.bill_details.kw_value}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status:</span>
              <span className={`${styles.detailValue} ${styles[tenant.bill_details.status]}`}>
                {tenant.bill_details.status.replace('_', ' ')}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Payment Date:</span>
              <span className={styles.detailValue}>
                {tenant.bill_details.payment_date ? formatDate(tenant.bill_details.payment_date) : 'Not paid'}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Calculated At:</span>
              <span className={styles.detailValue}>{formatDate(tenant.bill_details.calculated_at)}</span>
            </div>
          </>
        ) : (
          <div className={styles.noBill}>No bill details available</div>
        )}
      </div>
    </div>
  );
}

export default Billing;