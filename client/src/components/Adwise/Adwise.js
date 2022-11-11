
import styles from './Adwise.module.sass';
import './Adwise.css'

const list = [
  {icon: "fas fa-heart list", 
  text: "Complimentary extension of your contest timeline.", },
  {
    icon: "fas fa-smile list", 
  text:  "Complimentary consultation with a Squadhelp branding consultant.",
  },
  {
    icon: "fab fa-studiovinari list", 
  text:  " Apply your contest award toward the purchase of any premium name from our Marketplace.",
  },
  {
    icon: "fab fa-steam-symbol list", 
  text:  "Partial refund for Gold and Platinum packages.",
  },
  {
    icon: "fas fa-table-tennis list", 
  text:    "No-questions-asked refund within 10 days for any marketplace domains purchased.",
  },
]

const Adwise = ({ isVisible = false, onClose }) => {

  return !isVisible ? null : (
    <div className={styles.modal}>
      <div className={styles.forClose} onClick={onClose}></div>
        <div className={styles.modalMain}>
          <h4 className={styles.blue}>We Stand By Our Process.</h4>
          <p className={styles.subtitle}>If you are not satisfied receive</p>
          <ul className={styles.adwiseList}>
            { list.map((item)=>{
              return(
            <li className={styles.adwise}>
                  <span className={item.icon}></span>
                <div className={styles.adwiseText}>
                  {item.text}
                </div>
            </li>
            )
            })}
          </ul>
          <div className={styles.listFooter}>
            <button className={styles.listClose} onClick={onClose}>Close</button>
          </div>
        </div>
    </div>
  )
}

export default Adwise