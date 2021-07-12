import { useState } from 'react';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

interface FoodProps {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

function Dashboard(){

    const { foods, handleAddFood, handleUpdateFood, handleDeleteFood } = useFoods()

    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingFood, setEditingFood] = useState({} as FoodProps)

    function toggleModal(){
      setModalOpen(!modalOpen)
    }    

    function toggleEditModal(){
      setEditModalOpen(!editModalOpen)
    }

    function handleEditFood(food: FoodProps){
      setEditingFood(food)
      setEditModalOpen(true)
    }

    return (
      <>
        <Header onOpenNewDishModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
}

export default Dashboard;
