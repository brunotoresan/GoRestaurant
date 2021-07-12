import { createContext, useEffect, useState, ReactNode, useContext } from "react"
import api from '../services/api'

interface Food {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

type FoodInput = Omit<Food, 'id' | 'available'>

interface FoodProviderProps {
    // accepts all valid React data (e.g. jsx, html, text,...)
    // this enables the component FoodsProvider to have children elements
    children: ReactNode
}

interface FoodsContextData {
    foods: Food[]
    handleAddFood: (newFood: FoodInput) => Promise<void>
    handleUpdateFood: (food: Food, editingFood: Food) => Promise<void>
    handleDeleteFood: (id: number ) => Promise<void>
}

// The provider property will make the context available for other components 
const FoodsContext = createContext<FoodsContextData>(
    {} as FoodsContextData
)

export function FoodsProvider({ children }: FoodProviderProps){
    const [foods, setFoods] = useState<Food[]>([])

    useEffect(() =>  {
        async function loadFoods() {
            let response = await api.get<Food[]>('/foods')
                                    .then(response => response.data)
            setFoods(response)
        }
    
        loadFoods();
      }, []);

    async function handleAddFood(newFood: FoodInput) {
        try {
            const response = await api.post('/foods', {
                ...newFood,
                available: true
            })
            const { food } = response.data
    
            setFoods([
                ...foods,
                food
            ])            
        } catch(error) {
            console.log(error);
        }       
    }

    async function handleUpdateFood(food: Food, editingFood: Food) {
        try {
          const updatedFood = await api.put(
            `/foods/${editingFood.id}`,
            { ...editingFood, ...food },
          );
    
          const updatedFoods = foods.map(f =>
            f.id !== updatedFood.data.id ? f : updatedFood.data,
          );
    
          setFoods(updatedFoods)
        } catch (error) {
          console.log(error);
        }
      }

    async function handleDeleteFood(id: number) {    
        await api.delete(`/foods/${id}`);
        const foodsFiltered = foods.filter(food => food.id !== id);
        setFoods(foodsFiltered)
      }

    return (
        <FoodsContext.Provider 
            value={ {foods, handleAddFood, handleUpdateFood, handleDeleteFood} }
        >
            {children}
        </FoodsContext.Provider>
    )
}

export function useFoods() {
    const context = useContext(FoodsContext)
    return context
}
