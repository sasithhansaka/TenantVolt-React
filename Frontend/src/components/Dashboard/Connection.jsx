import React, { useState, useEffect } from 'react';
import styles from './Connection.module.css';

function Connection() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const tenants = userData?.orderDetails?.tenants || [];
  
  const [connectionStatus, setConnectionStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null); // Track which tenant is being updated

  useEffect(() => {
    const fetchConnectionStatus = async () => {
      try {
        if (!tenants || tenants.length === 0) {
          setLoading(false);
          return;
        }

        const requestBody = {
          tenants: tenants.map((tenant, index) => ({
            tenant_index: index,
            product_id: tenant.productId || `111${index + 2}`
          }))
        };

        const response = await fetch(
          'https://tenantvolt-usage-api-4e86f80f2f1b.herokuapp.com/electricity/connection-status/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConnectionStatus(data.tenants || []);
      } catch (err) {
        console.error("Error fetching connection status:", err);
        setError(err.message);
        // Fallback to sample data
        setConnectionStatus(tenants.map((tenant, index) => ({
          tenant_index: index,
          connection_status: index % 2 === 0 // Alternate status for sample
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchConnectionStatus();
  }, [tenants]);

  const updateConnectionStatus = async (productId, newStatus) => {
    setUpdating(productId);
    try {
      const response = await fetch(
        'https://tenantvolt-usage-api-4e86f80f2f1b.herokuapp.com/electricity/update-connection-status/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            connection_status: newStatus,
            product_id: productId
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status for product ${productId}`);
      }

      // Update local state to reflect the change
      setConnectionStatus(prev => prev.map(item => 
        item.product_id === productId 
          ? { ...item, connection_status: newStatus }
          : item
      ));
    } catch (err) {
      console.error("Error updating connection status:", err);
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusForTenant = (index) => {
    const status = connectionStatus.find(item => item.tenant_index === index);
    return status ? status.connection_status : false;
  };

  return (
    <div className={styles.connectionContainer}>
      <h2>Connection Status</h2>
      <p>Manage electricity connection for each tenant</p>

      {loading ? (
        <div className={styles.loading}>Loading connection status...</div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : tenants.length === 0 ? (
        <div className={styles.noTenants}>No tenants found</div>
      ) : (
        <div className={styles.tenantsList}>
          {tenants.map((tenant, index) => {
            const isConnected = getStatusForTenant(index);
            const productId = tenant.productId || `111${index + 2}`;
            const isUpdating = updating === productId;

            return (
              <div key={index} className={styles.tenantCard}>
                <div className={styles.tenantInfo}>
                  <h3>{tenant.name || `Tenant ${index + 1}`}</h3>
                  <p>Product ID: {productId}</p>
                  <p>Address: {tenant.address || 'N/A'}</p>
                </div>
                <div className={styles.statusSection}>
                  <div className={`${styles.statusIndicator} ${isConnected ? styles.connected : styles.disconnected}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </div>
                  <button
                    onClick={() => updateConnectionStatus(productId, !isConnected)}
                    disabled={isUpdating}
                    className={`${styles.toggleButton} ${isConnected ? styles.disconnect : styles.connect}`}
                  >
                    {isUpdating ? 'Updating...' : isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Connection;