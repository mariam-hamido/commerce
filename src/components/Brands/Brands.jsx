import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Modal from './../Modal/Modal';

export default function Brands() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', image: '' });

  
  
  
  async function getBrands() {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
      setBrands(data.data);
      setError(null);
      
    } catch (error) {
      setError(error.response.data.message);
      setBrands([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleOpenModal = (brands) => {
    console.log('Opening modal with:', brands);
    setModalContent({ title: brands.slug, image: brands.image });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className='py-20'>
        <div className='container mx-auto'>
          <h1 className="text-3xl text-green-600 flex justify-center font-bold underline">All Brands</h1>
          <div className="row py-10">
            {isLoading ? <Loader /> :
              error ? <div className='alert-error'>{error}</div> :
                <div className='row'>
                  {brands.map(brand => (
                    <div
                      className='w-1/4 px-4 mb-4 product'
                      key={brand.id}
                      onClick={() => handleOpenModal(brands)}
                    >
                      <img className='mb-2' src={brand.image} alt={brand.slug} />
                      <h2 className='text-lg font-semibold uppercase text-center mb-2'>{brand.slug}</h2>
                    </div>
                  ))}
                </div>}
          </div>
        </div>
      </section>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        title={modalContent.title}
        image={modalContent.image}
      />
    </>
  );
}
