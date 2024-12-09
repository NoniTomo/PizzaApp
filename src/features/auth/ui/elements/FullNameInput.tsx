import styles from '../../AuthPage.module.css'

export const FullNameInput = ({ register, errors }: AuthPageInput) => (
  <label className={styles.form__label}>
    <input
      {...register('fullName', {
        required: 'Введите имя!',
        minLength: 2,
        maxLength: 100,
        pattern: {
          value: /^[а-яА-Яa-zA-ZёЁ\s]*$/,
          message: 'Недопустимое значение!'
        }
      })}
      className={`${styles.form__input}`}
      type="text"
      placeholder="Name"
    />
    {errors.fullName && <span className={`${styles.error_alert}`}>{errors.fullName?.message}</span>}
    {errors.fullName && errors.fullName.type === 'minLength' && (
      <span className={styles.error_alert}>Минимум 2 символа!</span>
    )}
    {errors.fullName && errors.fullName.type === 'maxLength' && (
      <span className={styles.error_alert}>Не более 100 символов!</span>
    )}
  </label>
)
