import Select from 'react-select';
import itemServices from '../../../services/itemServices';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ItemCard from '../ItemCard/ItemCard';

export default function ItemsList() {
    const params = useParams();
    const { userId } = params;
    const [itemList, setItemList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(() => {
        async function fetchItemsList() {
          try {
            const itemsData = await itemServices.listItems(userId);
            setItemList(itemsData.items || []);
          } catch (error) {
            console.log("Error:", error);
          }
        }
        fetchItemsList();
      }, [userId, setItemList]);

    if (!Array.isArray(itemList) || itemList.length === 0) {
    return (
        <>
        <h1>No Items Found</h1>
        </>
      );
    }

    const categories = Array.from(
      new Set(itemList.map((item) => item.category))
    );

    const categoryOptions = categories.map((category) => ({ 
      value: category,
      label: category
    })); 

    const filteredItem = selectedCategory ? itemList.filter((item) => item.category === selectedCategory.value) : itemList;

    return (
      <div className="content">
        <section className="itemListSection">
            <h1>Items List</h1>
            <div className="itemListFilter">
              <Select onChange={(selectedOption) => setSelectedCategory(selectedOption)} value={selectedCategory} options={categoryOptions} isClearable placeholder="Filter by category" />
            </div>
            <div className="itemsList">
                {filteredItem.map((item) => (
                    <div key={item._id}>
                        <ItemCard item={item} />
                    </div>
                ))}
            </div>
        </section>
      </div>
    );
  };