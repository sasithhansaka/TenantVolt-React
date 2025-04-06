import React from "react";
import styles from "./TenantDetails.module.css";

function TenantDetails({ tenants }) {
  if (!tenants || tenants.length === 0) return null;

  return (
    <div className={styles.tenantSection}>
      <h2 className={styles.sectionTitle}>Tenant Details</h2>
      <p className={styles.description}>
        Below you'll find the complete details of all tenants associated with your account. 
        This information helps you manage your properties and tenant relationships efficiently.
      </p>
      
      <div className={styles.tenantTableContainer}>
        <table className={styles.tenantTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Product ID</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr key={index}>
                <td>{tenant.name}</td>
                <td>{tenant.email}</td>
                <td>{tenant.address}</td>
                <td>{tenant.productId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TenantDetails;