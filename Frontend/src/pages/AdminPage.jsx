import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [productIds, setProductIds] = useState({});

  // Fetch pending and completed orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const pendingResponse = await axios.get(
          "https://tenantvolt-5cd875450cc3.herokuapp.com/api/orders/pending/"
        );
        const completedResponse = await axios.get(
          "https://tenantvolt-5cd875450cc3.herokuapp.com/api/orders/completed/"
        );

        // Log the API responses for debugging
        console.log("Pending Orders Response:", pendingResponse.data);
        console.log("Completed Orders Response:", completedResponse.data);

        // Handle the response data based on its actual structure
        const pendingData = pendingResponse.data?.orders || pendingResponse.data || [];
        const completedData = completedResponse.data?.orders || completedResponse.data || [];

        setPendingOrders(Array.isArray(pendingData) ? pendingData : []);
        setCompletedOrders(Array.isArray(completedData) ? completedData : []);
      } catch (err) {
        setError(err.message);
        setPendingOrders([]);
        setCompletedOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle product ID input change
  const handleProductIdChange = (orderId, tenantIndex, value) => {
    setProductIds({
      ...productIds,
      [orderId]: {
        ...productIds[orderId],
        [tenantIndex]: value,
      },
    });
  };

  // Complete an order
  const completeOrder = async (order) => {

    // order.preventDefault(); // Prevent the default form submission behavior
    try {
      setLoading(true);
      const tenantsData = order.tenants.map((tenant, index) => ({
        tenant_index: index,
        product_id: productIds[order.uid]?.[index] || "",
      }));

      await axios.post(
        "https://tenantvolt-5cd875450cc3.herokuapp.com/api/orders/update-status/",
        {
          uid: order.uid,
          tenants: tenantsData,
        }
      );

      const pendingResponse = await axios.get(
        "https://tenantvolt-5cd875450cc3.herokuapp.com/api/orders/pending/"
      );
      const completedResponse = await axios.get(
        "https://tenantvolt-5cd875450cc3.herokuapp.com/api/orders/completed/"
      );
      setPendingOrders(Array.isArray(pendingResponse.data) ? pendingResponse.data : []);
      setCompletedOrders(Array.isArray(completedResponse.data) ? completedResponse.data : []);
      setExpandedOrder(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error}
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <h1>Order Management Dashboard</h1>
      
      <section className={styles.section}>
        <h2>Pending Orders ({pendingOrders.length})</h2>
        {pendingOrders.length === 0 ? (
          <p>No pending orders</p>
        ) : (
          <div className={styles.ordersList}>
            {pendingOrders.map((order) => (
              <div key={order.uid} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <h3>
                      {order.owner.first_name} {order.owner.last_name}
                    </h3>
                    <p>Address: {order.owner.address}</p>
                    {/* <p>Email: {order.owner.email}</p> */}
                    <p>Phone: {order.owner.mobile_number}</p>
                    <p>Order Date: {order.order_info.order_date_time}</p>
                    {/* <p>Status: {order.order_info.order_status}</p> */}
                  </div>
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.uid ? null : order.uid)}
                    className={styles.toggleButton}
                  >
                    {expandedOrder === order.uid ? "▲ Hide" : "▼ Show Tenants"}
                  </button>
                </div>

                {expandedOrder === order.uid && (
                  <div className={styles.tenantsSection}>
                    <h4>Tenants:</h4>
                    {order.tenants.map((tenant, index) => (
                      <div key={index} className={styles.tenantRow}>
                        <div className={styles.tenantInfo}>
                          <p>
                            <strong>Name:</strong> {tenant.name}
                          </p>
                          <p>
                            <strong>Address:</strong> {tenant.address}
                          </p>
                          <p>
                            <strong>Email:</strong> {tenant.email}
                          </p>
                        </div>
                        <div className={styles.productIdInput}>
                          <label>Product ID:</label>
                          <input
                            type="text"
                            value={productIds[order.uid]?.[index] || ""}
                            onChange={(e) =>
                              handleProductIdChange(
                                order.uid,
                                index,
                                e.target.value
                              )
                            }
                            placeholder="Enter product ID"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => completeOrder(order)}
                      className={styles.completeButton}
                      disabled={
                        !order.tenants.every(
                          (_, index) => productIds[order.uid]?.[index]
                        )
                      }
                    >
                      Complete Order
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2>Completed Orders ({completedOrders.length})</h2>
        {completedOrders.length === 0 ? (
          <p>No completed orders</p>
        ) : (
          <div className={styles.ordersList}>
            {completedOrders.map((order) => (
              <div key={order.uid} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <h3>
                      {order.owner.first_name} {order.owner.last_name}
                    </h3>
                    <p>Address: {order.owner.address}</p>
                    {/* <p>Email: {order.owner.email}</p> */}
                    <p>Phone: {order.owner.mobile_number}</p>
                    <p>Order Date: {order.order_info.order_date_time}</p>
                    {/* <p>Status: {order.order_info.order_status}</p> */}
                  </div>
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.uid ? null : order.uid)}
                    className={styles.toggleButton}
                  >
                    {expandedOrder === order.uid ? "▲ Hide" : "▼ Show Tenants"}
                  </button>
                </div>

                {expandedOrder === order.uid && (
                  <div className={styles.tenantsSection}>
                    <h4>Tenants:</h4>
                    {order.tenants.map((tenant, index) => (
                      <div key={index} className={styles.tenantRow}>
                        <div className={styles.tenantInfo}>
                          <p>
                            <strong>Name:</strong> {tenant.name}
                          </p>
                          <p>
                            <strong>Address:</strong> {tenant.address}
                          </p>
                          <p>
                            <strong>Email:</strong> {tenant.email}
                          </p>
                          <p>
                            {/* <strong>Product ID:</strong> {tenant.product_id} */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPage;