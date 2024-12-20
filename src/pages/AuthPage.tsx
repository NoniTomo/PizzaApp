import type { MutableRefObject } from 'react'
import { useRef } from 'react'

import { SignInForm, SignUpForm } from '@/features/auth'
import { useMediaQuery } from '@/shared/hooks'

import styles from '@/features/auth/AuthPage.module.css'

export const AuthPage = () => {
  const isMedia800 = useMediaQuery('(width < 800px)')
  const switchCtn = useRef() as MutableRefObject<HTMLDivElement>
  const switchC1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchC2 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle1 = useRef() as MutableRefObject<HTMLDivElement>
  const switchCircle2 = useRef() as MutableRefObject<HTMLDivElement>
  const aContainer = useRef() as MutableRefObject<HTMLDivElement>
  const bContainer = useRef() as MutableRefObject<HTMLDivElement>

  const switchForm = () => {
    switchCtn.current.classList.add(styles.is_gx)

    setTimeout(() => switchCtn.current.classList.remove(styles.is_gx), 1500)

    switchCtn.current.classList.toggle(styles.is_txr)
    switchCircle1.current.classList.toggle(styles.is_txr)
    switchCircle2.current.classList.toggle(styles.is_txr)

    switchC1.current.classList.toggle(styles.is_hidden)
    switchC2.current.classList.toggle(styles.is_hidden)
    aContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_txl)
    bContainer.current.classList.toggle(styles.is_z200)
  }

  return (
    <div className={`${styles.main} `}>
      <div className={`${styles.container} ${styles.a_container} `} id="a-container" ref={aContainer}>
        <div className={styles.container__inner}>
          <SignUpForm switchForm={switchForm} />
        </div>
      </div>
      <div className={`${styles.container} ${styles.b_container} `} id="b-container" ref={bContainer}>
        <div className={styles.container__inner}>
          <SignInForm />
        </div>
      </div>
      <div className={`${styles.switch} `} id="switch-cnt" ref={switchCtn}>
        <div className={`${styles.switch__circle} `} ref={switchCircle1} />
        <div className={`${styles.switch__circle} ${styles.switch__circle_t} `} ref={switchCircle2} />
        <div className={styles.switch__container} id="switch-c1" ref={switchC1}>
          {!isMedia800 && (
            <>
              <h2 className={`${styles.switch__title} ${styles.title} `}>Добро пожаловать!</h2>
              <p className={`${styles.switch__description} ${styles.description} `}>
                Чтобы оставаться на связи с нами, пожалуйста, войдите под своей личной информацией
              </p>
            </>
          )}
          <button
            onClick={switchForm}
            className={`${styles.switch__button} ${styles.button} ${styles.switch__btn} `}
          >
            SIGN IN
          </button>
        </div>
        <div
          className={`${styles.switch__container} ${styles.is_hidden} `}
          id="switch-c2"
          ref={switchC2}
        >
          {!isMedia800 && (
            <>
              <h2 className={`${styles.switch__title} ${styles.title} `}>Привет, друг!</h2>
              <p className={`${styles.switch__description} ${styles.description} `}>
                Введите свои личные данные и начните путешествие с нами
              </p>
            </>
          )}
          <button
            onClick={switchForm}
            className={`${styles.switch__button} ${styles.button} ${styles.switch__btn} `}
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  )
}
