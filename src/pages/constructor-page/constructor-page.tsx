import { useAppSelector } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import type { RootState } from '../../services/store';

export const ConstructorPage: FC = () => {
  const { loading: isIngredientsLoading, error } = useAppSelector(
    (state: RootState) => state.ingredients
  );

  if (error) {
    return (
      <div className={styles.containerMain}>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Произошла ошибка
        </h1>
        <p className={`text text_type_main-medium pl-5`}>
          Не удалось загрузить ингредиенты. Попробуйте обновить страницу.
        </p>
      </div>
    );
  }

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
