import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './AuthModal.module.css';
import { Link } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;
  const handleMobileSubmit = () => {
      setIsOtpScreen(true); 
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
       
        <button className={styles.modalClose} onClick={onClose}>
          <Icon icon="mdi:close" width="30" height="30" color="#0E201D" />
        </button>

        {!isOtpScreen ? (
          <>
            <h2 className={styles.modalTitle}>Login / Signup</h2>
            <p className={styles.modalSubtitle}>Join us now to be a part of our family.</p>
            
            <div className={styles.inputContainer}>
              <Icon icon="twemoji:flag-for-india" width="30" height="30" />
              <input 
                type="text" 
                placeholder="Enter Mobile Number" 
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className={styles.inputField} 
              />
            </div>

            <button className={styles.continueButton} onClick={handleMobileSubmit}>
              CONTINUE
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.modalTitle}>Enter OTP</h2>
            <p className={styles.modalSubtitle}>We've sent a 4-digit OTP to your mobile number.</p>
            
            <div className={styles.inputContainer}>
              <Icon icon="ic:baseline-message" width="30" height="30" />
              <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={styles.inputField} 
              />
            </div>

            <button className={styles.continueButton}>
              SUBMIT OTP
            </button>
          </>
        )}

        {!isOtpScreen && (
          <>
            <div className={styles.separator}>OR</div>
            
            <div className={styles.socialLoginContainer}>
              <button className={styles.googleButton} >
                <Icon icon="logos:google-icon" width="24" height="24" style={{padding: '4px'}}/>
                Google
              </button>
            </div>

            <p className={styles.termsText}>
              By creating an account or logging in, you agree with our <Link to='/terms' onClick={onClose}>Terms and Conditions</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
