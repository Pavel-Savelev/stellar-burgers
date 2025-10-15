import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { RootState } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientData = useAppSelector((state: RootState) =>
    state.ingredients.items.find((ingredient) => ingredient._id === id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
