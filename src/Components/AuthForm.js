import logoBlack from '../images/logo_black.png';
import authPageBackground from '../images/login_page.png';
import classes from './AuthForm.module.css';
import { Link , useSearchParams , useNavigation , Form} from 'react-router-dom';
function AuthForm(){
    const [searchParams] = useSearchParams();
    const isSignup = searchParams.get('mode') !== 'login';
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return <>
        <div className={classes.authPage}>
        <img 
          src={authPageBackground} 
          className={classes.authBackground} 
          alt="Hero Page" 
        />
      <div className={classes.authOverlay}>
        <div className={classes.authFormContainer}>
          <div className={classes.logoContainer}>
            <img src={logoBlack} alt="Logo" className={classes.logoImage} />
          </div>
          <Form className={classes.authForm} method='POST'>
            <div className={classes.formGroup}>
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="email" className={classes.formLabel}>
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                id="email"
                className={classes.formInput}
                placeholder="Enter your email address"
                name='email'
              />
            </div>
            <div className={classes.formGroup}>
              <label htmlFor="password" className={classes.formLabel}>
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className={classes.formInput}
                placeholder="Enter your password"
                name='password'
              />
            </div>
            <div className={classes.formActions}>
              <button
                type="submit"
                className="button"
                disabled = {isSubmitting? true : false}
              >
                {isSubmitting ? 'submitting...' : (isSignup ? 'SIGN UP' : 'LOG IN')}
              </button>
              <div className={classes.authLink}>
                {isSignup ? (
                  <p>Already have an account? <Link to="/auth?mode=login" className={classes.authLinkAnchor}>Log in</Link></p>
                ) : (
                  <p>Don't have an account? <Link to="/auth?mode=signup" className={classes.authLinkAnchor}>Sign up</Link></p>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
    </>
}
export default AuthForm;