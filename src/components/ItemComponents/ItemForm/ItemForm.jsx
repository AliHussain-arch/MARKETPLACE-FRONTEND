import itemServices from "../../../services/itemServices";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ItemForm() {
  const params = useParams();
  const navigate = useNavigate();
  const { userId } = params;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: null,
    seller: userId,
  });

  function handleFormData(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    await itemServices.createItem(userId,formData);
    navigate(`/user/${userId}/item`);
  }

  return (
    <div className="content">
    <section className="formSection">
      <div className='formContainer'>
        <h1>ItemForm</h1>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Item name</label>
            <input
            type="text"
            name="name"
            id="name"
            placeholder="Item Name"
            onChange={handleFormData}
            value={formData.name}
            />
            <label htmlFor="itemDescription">Item Description</label>
            <input
            type="text"
            name="description"
            id="description"
            placeholder="Item Description"
            onChange={handleFormData}
            value={formData.description}
            required
            />
            <label htmlFor="category">Category:</label>
            <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleFormData}
            required
            >
              <option value="">Select a category</option>
              <option value="Books">Books</option>
              <option value="Clothes">Clothes</option>
              <option value="Electronics">Electronics</option>
              <option value="Art">Art</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <label htmlFor="price">Item price</label>
            <input
            type="number"
            name="price"
            id="price"
            placeholder="Item price"
            onChange={handleFormData}
            value={formData.price}
            required
            />
          <div className="submitButton">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
    </div>
  );
}
