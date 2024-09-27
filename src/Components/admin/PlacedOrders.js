import Demo from './OrderTable';
import styles from './Dashboard.module.css'
const PlacedOrder = () => {
  return (
    <>
      <div className={styles.alignProducts}>
      <div className={styles.OrdersBox}>
        <Demo />
      </div>
      </div>
    </>
  )
}

export default PlacedOrder;
