import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';


export const IngredientDetails: FC = () => {

  const {id} = useParams<{id:string}>()
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector((state:RootState)=> state.ingredients.items.find((ingredient) => ingredient._id === id))

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
