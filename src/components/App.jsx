import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from './Modal';
import toast, { Toaster } from 'react-hot-toast';

const KEY = '34603447-420b9507c9dfa301393340c59';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
   const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(null);

  const setIndex = index => {
    setActiveIndex(index);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    setLoading(true);
    setError('');

    fetch(
      `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        console.log(res);
        if (res.total === 0) {
          toast.error(`nothing was found to your request ${query}.`);
        }
        if (page === 1) {
          setImages([...res.hits]);
          return;
        }
        setImages(prevImages => [...prevImages, ...res.hits]);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page]);

  const onSearch = value => {
    setImages([]);
    setQuery(value);
    setPage(1);
  } 
  return (
    <div>
      <Searchbar onSubmit={onSearch}></Searchbar>
       {showModal && (
        <Modal onClose={closeModal}>
          <img
            src={images[activeIndex].largeImageURL}
            alt={images[activeIndex].tags}
            width="700px"
            height="450"
          />
        </Modal>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      {error && <div>{error.message}</div>}
      {loading && (
        <div className="gallery__section">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      )}
      <ImageGallery>
         {images.map((image, index) => {
          return (
            <ImageGalleryItem
              onClick={openModal}
              setIndex={setIndex}
              key={image.id}
              index={index}
              image={image.webformatURL}
              tags={image.tags}
            />
          );
        })}
      </ImageGallery>
       {images.length >= 12 && (
        <Button
          onLoadMore={() => {
            setPage(prevPage => prevPage + 1);
          }}
        ></Button>
      )}
     </div>
  )
}


export { App };