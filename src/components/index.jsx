import React, { useState } from 'react';
import { useGetAllProductsQuery } from '../features/productsApi';
import './style.scss';

const Components = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isArchivedFilter, setIsArchivedFilter] = useState(false);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const categories = data?.data?.categories || [];

  const filteredCategories = categories.map(category => {
    const filteredMenuItems = category.menuItems.filter(item => 
      (selectedCategory === 'All' || category.name[0]?.value === selectedCategory) &&
      (!isArchivedFilter || item.isArchived) 
    );
  
    if (filteredMenuItems.length > 0) {
      return {
        ...category,
        menuItems: filteredMenuItems
      };
    }
    return null;
  }).filter(category => category !== null);
  
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };


  return (
    <div className='content'>
      <div className="header">
        <h2>Menu</h2>
      </div>
      <div className="buttonBox">  
        <button 
          className="custom-button" 
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        {categories.map((category) => (
          <button 
            key={category.id} 
            className="custom-button" 
            onClick={() => setSelectedCategory(category.name[0]?.value)}
          >
            {category.name[0]?.value}
          </button>
        ))}
             <button 
          className="custom-button"
          onClick={() => setIsArchivedFilter(!isArchivedFilter)} 
        >
          {isArchivedFilter ? 'Show All' : 'Show Archived'}
        </button>
      </div>

      {filteredCategories.length > 0 ? (
        <div>
          {filteredCategories.map((category) => (
            <div key={category.id} className="category-section">
              <div className="header">
                <p>{category.name[0]?.value}</p> 
              </div>

              <div className="cardBoxs">
                {category.menuItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="card" 
                    onClick={() => openModal(item)} 
                  >
                    <div className="price-tag"> ₼ {item.priceSell}</div> 
                    <img 
                        // src={`http://localhost:5000/${item.coverImageSrc}`} 
                      src="https://cdn.pixabay.com/photo/2016/04/26/16/58/coffe-1354786_640.jpg" 
                      alt={item.name[0]?.value} 
                      className="card-image" 
                    />
                    <div className="card-description">
                    {item.name[0]?.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No categories available.</p>
      )}

      {isModalOpen && selectedProduct && (
        <Modal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

const Modal = ({ product, onClose }) => {
  const [count, setCount] = useState(0);
  const increase = () => setCount(count + 1);
  const decrease = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content " onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
     
<div className="imgBox">
<img 
          // src={`http://localhost:5000/${product.coverImageSrc}`} 
          src="https://cdn.pixabay.com/photo/2016/04/26/16/58/coffe-1354786_640.jpg" 

          alt={product.name[0]?.value} 
          className="modal-image" 
        />
</div>
   <div className="modalContent">
   <h2>{product.name[0]?.value}</h2>
        <p className="modal-description">
          {product.description[0]?.value || "No description available."}
        </p>
        <div className="modal-price">
         ₼ {product.priceSell}
        </div>
        <div className="counter">
      <button className="counter-button" onClick={decrease}>-</button>
      <span className="counter-display">{count}</span>
      <button className="counter-button" onClick={increase}>+</button>
 
    </div>
         <p className='line'>_____________________________________</p>
<ul>
  <li> <p className='modal-description'>Size: Large</p> </li>
  <li> <p className='modal-description'>Nuts: Hazelnut, 2 x Alomnd</p> </li>
  <li> <p className='modal-description'>Syrups: Vanilla, Honey</p> </li>
  <li> <p className='modal-description'>Fruits: Banana, 2 x Raspberry</p> </li>

</ul>

   </div>
      </div>
    </div>
  );
};

export default Components;
