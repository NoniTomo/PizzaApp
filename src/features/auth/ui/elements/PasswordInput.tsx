import styles from '../../AuthPage.module.css'

export const PasswordInput = ({ register, errors }: AuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('password', {
        required: 'Введите пароль!',
        minLength: 8,
        maxLength: 50
      })}
      className={`${styles.form__input}`}
      type="password"
      placeholder="Password"
    />
    {errors.password && <span className={styles.error_alert}>{errors.password?.message}</span>}
    {errors.password && errors.password.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 8 символов!</span>
    )}
    {errors.password && errors.password.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 50 символов!</span>
    )}
  </label>
)
