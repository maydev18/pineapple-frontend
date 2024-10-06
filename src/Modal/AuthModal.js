import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './AuthModal.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isURLCopied , setCopyUrl] = useState(false);
  const {login} = useAuth();
  if (!isOpen) return null;
  const copyToClipboard = () => {
    const currentUrl = window.location.href; // Get current URL
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Check if the user is on an Android device
    if (/android/i.test(userAgent)) {
      // Open in Chrome on Android using intent
      window.location.href = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
    } 
    // Check if the user is on an iOS device
    else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      // Copy URL to clipboard on iOS
      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          setCopyUrl(true);
        })
        .catch(err => {
          setCopyUrl(false);
        });
    } 
    // For Desktop
    else {
      // Copy URL to clipboard for desktop
      navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setCopyUrl(true);
      })
      .catch(err => {
        setCopyUrl(false);
      });
    }
  };
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>

        <button className={styles.modalClose} onClick={() => {setCopyUrl(false); onClose();}}>
          <Icon icon="mdi:close" width="30" height="30" color="#0E201D" />
        </button>
          <>
            <div className={styles.socialLoginContainer}>
              <button className={styles.googleButton} style={{marginTop : '2rem'}} onClick={async () => {await login(); onClose();}}>
                <Icon icon="logos:google-icon" width="24" height="24" style={{padding: '4px'}}/>
                Login with Google
              </button>
            </div>
            <p className={styles.termsText}>
              By creating an account or logging in, you agree with our <Link to='/terms' onClick={onClose}>Terms and Conditions</Link>
            </p>
            <div className={styles.separator} style={{color : 'red'}}>If you are viewing this page on Instagram, Please switch to Chrome/Safari for seamless login and added security <Link to="#" onClick={copyToClipboard} style={{color : isURLCopied? "green" : "blue"}}> {isURLCopied ? "URL Copied" : "Copy URL"}</Link>
              
            </div>
          </>
      </div>
    </div>
  );
};

export default AuthModal;
