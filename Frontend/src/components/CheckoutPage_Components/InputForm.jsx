import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "./InputForm.module.css";
import BundleDetails from "./BundleDetails";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function InputForm({ selectedBundle, quantity }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    address: "", // Added address field
    tenants: Array(quantity).fill({ name: "", email: "", address: "" }),
  });

  const [showTenantDetails, setShowTenantDetails] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTenantDetails = () => {
    setShowTenantDetails(!showTenantDetails);
  };

  const handleTenantChange = (index, field, value) => {
    const updatedTenants = [...formData.tenants];
    updatedTenants[index] = { ...updatedTenants[index], [field]: value };
    setFormData((prev) => ({ ...prev, tenants: updatedTenants }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      { field: "firstName", name: "First Name" },
      { field: "lastName", name: "Last Name" },
      { field: "mobileNumber", name: "Mobile Number" },
      { field: "email", name: "Email" },
      { field: "password", name: "Password" },
      { field: "address", name: "Address" }
    ];
  
    const missingFields = requiredFields.filter(f => !formData[f.field].trim());
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n${missingFields.map(f => f.name).join('\n')}`);
      return;
    }
  
    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      mobile_number: formData.mobileNumber,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      tenants: showTenantDetails ? formData.tenants.map(tenant => ({
        name: tenant.name,
        email: tenant.email,
        address: tenant.address
      })) : []
    };
  
    console.log("Submitting:", JSON.stringify(data, null, 2));
  
    try {
      const response = await axios.post(
        "https://tenantvolt-5cd875450cc3.herokuapp.com/api/auth/signup/",
        data,
       
      );
  
      console.log("Signup successful:", response.data);
      alert("Registration Successful!");
  
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
        address: "",
        tenants: Array(quantity).fill({ name: "", email: "", address: "" }),
      });
  
      setShowTenantDetails(false);
  
    } catch (err) {
      console.error("Full error details:", {
        config: err.config,
        request: err.request,
        response: err.response?.data
      });
    
      if (err.response?.data?.error) {
        alert(err.response.data.error); // Show only the backend error message
      } 
      else if (err.response?.data?.message) {
        alert(err.response.data.message); // Show only the backend message
      }
      else {
        // Fallback to generic error if no backend message exists
        alert("An error occurred. Please try again.");
      }
    }
  };


  return (
    <motion.div
      className={styles.checkoutContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      ref={ref}
    >
      <div className={styles.checkoutForm}>
        <motion.h1 className={styles.title} variants={itemVariants}>
          TENANTVOLT
        </motion.h1>
        <motion.p className={styles.description} variants={itemVariants}>
          {/* Account Details<br></br> */}
          Please fill in your account details.By completing this form, you will
          be able to secure your TenantVolt product and enjoy the benefits of
          our exclusive bundles.
        </motion.p>

        <form onSubmit={handleSubmit}>
          <motion.div
            className={styles.nameSection}
            variants={containerVariants}
          >
            <motion.div className={styles.nameField} variants={itemVariants}>
              <label className={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your First Name"
                className={styles.inputField}
                required
              />
            </motion.div>

            <motion.div className={styles.nameField} variants={itemVariants}>
              <label className={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your Last Name"
                className={styles.inputField}
                required
              />
            </motion.div>
          </motion.div>
          <motion.div className={styles.fieldGroup} variants={itemVariants}>
            <label className={styles.label}>Your Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              className={styles.inputField}
              required
            />
          </motion.div>

          <motion.div className={styles.fieldGroup} variants={itemVariants}>
            <label className={styles.label}>Mobile Number</label>
            <div className={styles.mobileInput}>
              <span className={styles.countryCode}>+94</span>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="xxxxxxxxxx"
                className={styles.inputField}
                required
              />
            </div>
          </motion.div>

          <motion.div className={styles.fieldGroup} variants={itemVariants}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className={styles.inputField}
              required
            />
          </motion.div>

          <motion.div className={styles.fieldGroup} variants={itemVariants}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={styles.inputField}
              required
            />
          </motion.div>

          {/* Tenant Details Section */}
          <motion.div
            className={styles.tenantSection}
            variants={containerVariants}
          >
            <div className={styles.sectionHeader}>
              <motion.h3
                className={styles.sectionTitle}
                variants={itemVariants}
              >
                Tenant Details
              </motion.h3>
              <button
                type="button"
                onClick={toggleTenantDetails}
                className={styles.toggleButton}
              >
                {showTenantDetails ? "Hide Details" : "Add Details"}
              </button>
            </div>

            {showTenantDetails && (
              <div className={styles.tenantDetailsContent}>
                {formData.tenants.map((tenant, index) => (
                  <motion.div
                    key={index}
                    className={styles.tenantForm}
                    variants={containerVariants}
                    custom={index}
                  >
                    <motion.h4
                      className={styles.tenantTitle}
                      variants={itemVariants}
                    >
                      Tenant {index + 1}
                    </motion.h4>
                    <motion.div
                      className={styles.fieldGroup}
                      variants={itemVariants}
                    >
                      <label className={styles.label}>Full Name</label>
                      <input
                        type="text"
                        value={tenant.name}
                        onChange={(e) =>
                          handleTenantChange(index, "name", e.target.value)
                        }
                        placeholder="Tenant's full name"
                        className={styles.inputField}
                        required
                      />
                    </motion.div>
                    <motion.div
                      className={styles.fieldGroup}
                      variants={itemVariants}
                    >
                      <label className={styles.label}>Email</label>
                      <input
                        type="email"
                        value={tenant.email}
                        onChange={(e) =>
                          handleTenantChange(index, "email", e.target.value)
                        }
                        placeholder="tenant@example.com"
                        className={styles.inputField}
                        required
                      />
                    </motion.div>
                    <motion.div
                      className={styles.fieldGroup}
                      variants={itemVariants}
                    >
                      <label className={styles.label}>Address</label>
                      <input
                        type="text"
                        value={tenant.address}
                        onChange={(e) =>
                          handleTenantChange(index, "address", e.target.value)
                        }
                        placeholder="Tenant's address"
                        className={styles.inputField}
                        required
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <BundleDetails id={selectedBundle} quantity={quantity} />
          </motion.div>

          <motion.button
            type="submit"
            className={styles.submitButton}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default InputForm;


