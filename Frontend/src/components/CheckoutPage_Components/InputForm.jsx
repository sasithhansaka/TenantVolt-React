import React from 'react'
import { useState } from 'react';
import styles from './InputForm.module.css'

function InputForm() {

    const [formData, setFormData] = useState({
       firstName: '',
       lastName: '',
       mobileNumber: '',
       email: '',
       password: ''
     });
   
     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData(prev => ({ ...prev, [name]: value }));
     };
   
     const handleSubmit = (e) => {
       e.preventDefault();
       console.log('Form submitted:', formData);
       // Add your form submission logic here
     };
    

  return (
       <div className={styles.checkoutContainer}>
             <div className={styles.checkoutForm}>
               <h1 className={styles.title}>CHECKOUT</h1>
               
               <form onSubmit={handleSubmit}>
                 {/* Name Section - Flex Layout */}
                 <div className={styles.nameSection}>
                   <div className={styles.nameField}>
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
                   </div>
                   
                   <div className={styles.nameField}>
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
                   </div>
                 </div>
       
                 {/* Mobile Number */}
                 <div className={styles.fieldGroup}>
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
                 </div>
       
                 {/* Email */}
                 <div className={styles.fieldGroup}>
                   <label className={styles.label}>Email</label>
                   <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Example@Gmail.Com"
                     className={styles.inputField}
                     required
                   />
                 </div>
       
                 {/* Password */}
                 <div className={styles.fieldGroup}>
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
                 </div>
       
                 <button type="submit" className={styles.submitButton}>
                   Continue
                 </button>
               </form>
             </div>
           </div>
  )
}

export default InputForm
