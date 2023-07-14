import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Button } from '../Button';
import { RotatingLines } from 'react-loader-spinner';
import { Modal } from '../Modal';
import css from '../ImageGallery/ImageGallery.module.css';

const KEY = '34603447-420b9507c9dfa301393340c59';
const BASE_URL = 'https://pixabay.com/api/';

const ImageGallery = ({ query, initialPage }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(null);
  // const [error, setError] = useState(null);

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
        return res.json();
        // return Promise.reject(
        //   new Error(`По запросу ${query} ничего не найдено.`)
        // );
      })
      .then(res => {
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

  return (
    <div>
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
      {error && <div>За запитом {query} нічого не знайдено</div>}

      <ul className={css.gallery}>
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
      </ul>
      {images.length >= 12 && (
        <Button
          onLoadMore={() => {
            setPage(prevPage => prevPage + 1);
          }}
        ></Button>
      )}
    </div>
  );
};

// class ImageGallery extends Component {
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     loading: false,
//     showModal: false,
//     activeIndex: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.query;
//     const newQuery = this.props.query;
//     if (prevQuery !== newQuery) {
//       this.setState({ query: newQuery, loading: true, images: [] });
// fetch(
//   `${BASE_URL}?q=${newQuery}&page=${this.props.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
// )
//   .then(res => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(
//       new Error(`По запросу ${newQuery} ничего не найдено.`)
//     );
//   })
//   .then(res => {
//     this.setState({ images: res.hits });
//   })
//   .finally(() => {
//     this.setState({ loading: false });
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   });
//     }
//   }
//   onLoadMore = () => {
//     const query = this.state.query;

//     this.setState({ loading: true });
//     fetch(
//       `${BASE_URL}?q=${query}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         return Promise.reject(
//           new Error(`По запросу ${query} ничего не найдено.`)
//         );
//       })

//       .then(res => {
//         this.setState(prevState => ({
//           images: [...prevState.images, ...res.hits],
//         }));
//       })
//       .finally(() => {
//         this.setState({ loading: false });
//         this.setState(prevState => ({ page: prevState.page + 1 }));
//       });
//   };
// setActiveIndex = index => {
//   this.setState({ index });
//   console.log(index);
// };
//   openModal = () => {
//     this.setState({ showModal: true });
//     console.log(`toggle modal`);
//   };
//   closeModal = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     const { images, loading, showModal, index } = this.state;
// return (
//   <div>
//     {showModal && (
//       <Modal onClose={this.closeModal}>
//         <img
//           src={images[index].largeImageURL}
//           alt={images[index].tags}
//           width="700px"
//           height="450"
//         />
//       </Modal>
//     )}
//     {loading && (
//       <div className="gallery__section">
//         <RotatingLines
//           strokeColor="grey"
//           strokeWidth="5"
//           animationDuration="0.75"
//           width="96"
//           visible={true}
//         />
//       </div>
//     )}

//     <ul className={css.gallery}>
//       {images.map((image, index) => {
//         return (
//           <ImageGalleryItem
//             onClick={this.openModal}
//             setIndex={this.setActiveIndex}
//             key={image.id}
//             index={index}
//             image={image.webformatURL}
//             tags={image.tags}
//           />
//         );
//       })}
//     </ul>
//     {images.length >= 12 && <Button onLoadMore={this.onLoadMore}></Button>}
//   </div>
// );
//   }
// }
ImageGallery.propTypes = {
  query: PropTypes.string,
  page: PropTypes.number,
};
export { ImageGallery };
