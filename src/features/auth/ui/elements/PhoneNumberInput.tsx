import styles from '../../AuthPage.module.css'

export const PhoneNumberInput = ({ register, errors }: AuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('phoneNumber', {
        required: 'Введите номер!',
        pattern: {
          value: /\+[0-9]/,
          message: 'Недопустимое значение номера!'
        }
      })}
      className={`${styles.form__input}`}
      type="phone"
      placeholder="Phone"
    />
    {errors.phoneNumber && <span className={styles.error_alert}>{errors.phoneNumber?.message}</span>}
  </label>
)
