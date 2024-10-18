import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import styles from './AuthModal.module.css';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useError } from '../context/ErrorContext';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft } from 'react-icons/fa'

const AuthModal = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isOtpScreen, setIsOtpScreen] = useState(false); // changed from true to false to match initial behavior
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60); // Timer state initialized to 60 seconds
  const [err , seterr] = useState("");
  const { showError } = useError();
  const { login } = useAuth();

  useEffect(() => {
    if (isOtpScreen && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, isOtpScreen]); // Runs when the timer changes or OTP screen is active

  if (!isOpen) return null;

  // Timer logic

  const handleMobileSubmit = async () => {
    try {
      setIsLoading(true);
      setTimer(60); // Reset the timer when requesting a new OTP
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'auth/login-with-phone/' + mobileNumber);
      if (!res.ok) {
        throw new Error("Failed to send OTP");
      }
      setIsOtpScreen(true);
      seterr("");
    } catch (err) {
      seterr("Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(process.env.REACT_APP_BASE_URL + 'auth/verify-otp/' + mobileNumber + '/' + otp);
      if (!res.ok) {
        throw new Error("Failed to verify OTP");
      }
      const token = await res.json();
      await login(token.token, mobileNumber);
      closeModal();
      showError("Logged in Successfully", "success");
    } catch (err) {
      seterr("OTP did not match");
    } finally {
      setIsLoading(false);
    }
  };
  const closeModal = () => {
    setMobileNumber(null);
    setIsOtpScreen(null);
    setIsLoading(null);
    setOtp(null);
    seterr("");
    onClose();
  }
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={closeModal}>
          <Icon icon="mdi:close" width="30" height="30" color="#0E201D" />
        </button>

        {!isOtpScreen ? (
          <>
            <h2 className={styles.modalTitle}>Login / Signup</h2>
            <p className={styles.modalSubtitle}>Join us now to be a part of our family.</p>
            {
              err.length > 0 ? <p className={styles.modalSubtitle} style={{color : "red"}}>{err}</p> : ""
            }
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
              {isLoading ? <Spinner /> : "CONTINUE"}
            </button>
          </>
        ) : (
          <>
            <div style={{display : 'flex' , alignContent : "space-around"}}>
              <FaArrowLeft size={20} onClick={() => setIsOtpScreen(false)} style={{marginRight : '5rem'}}/>
              <h2 className={styles.modalTitle}>Enter OTP</h2>
            </div>
            <p className={styles.modalSubtitle}>We've sent a 4-digit OTP to your mobile number.</p>
            {
              err.length > 0 ? <p className={styles.modalSubtitle} style={{color : "red"}}>{err}</p> : ""
            }
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

            <button className={styles.continueButton} onClick={handleOTPSubmit}>
              {isLoading ? <Spinner /> : "SUBMIT OTP"}
            </button>

            {/* Display resend button after timer hits 0 */}
            {timer > 0 ? (
              <p className={styles.timerText}>Resend OTP in {timer}s</p>
            ) : (
              <button className={styles.continueButton} onClick={handleMobileSubmit}>
                Resend OTP
              </button>
            )}
          </>
        )}

        {!isOtpScreen && (
          <>
            <div className={styles.separator}>OR</div>

            <div className={styles.socialLoginContainer}>
              <button className={styles.googleButton} onClick={async () => { await login(); closeModal(); showError("Logged in successfully", "success"); }}>
                <Icon icon="logos:google-icon" width="24" height="24" style={{ padding: '4px' }} />
                Google
              </button>
            </div>

            <p className={styles.termsText}>
              By creating an account or logging in, you agree with our <Link to='/terms' onClick={closeModal}>Terms and Conditions</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
