import { useEffect, useRef, useState } from "react";
import { fetchedImages, perPage } from "Services/imageAPI";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import { ImagesList } from './ImageGallery.styled';
import Notiflix from "notiflix";

export const ImageGallery = ({request, defaultPage, defaultImages}) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const prevQuery = useRef(query);
  const prevPage = useRef(page);
  
  useEffect(() => {
    
    if (query !== request) {
      setQuery(request);
      setPage(defaultPage);
      setImages(defaultImages);
    }
  }, [query, page, request, defaultPage, defaultImages, images]);

  useEffect(() => {

    if (prevQuery.current !== query || prevPage.current !== page) {
      async function fetchData() {

        try {
          setLoading(true);
          // setError(null);
          const { hits, total } = await fetchedImages(query, page);
          setImages(prevImages => [...prevImages, ...hits]);
          setShowButton(page < Math.ceil(total / perPage));
        } catch (error) {
          Notiflix.Notify.warning("Yo've entered incorrect HTTP request. Please check it...");
          // alert(error)
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [query, page]);
  
  const handleButtonClick = (e) => {
    setPage(prevState => prevState + 1);
  }
  const toggleModal = (e) => {
    if (e && e.target) {
      setShowModal(() => !showModal);
      setSelectedImage(e.target.currentSrc)
    }
  }

  return (
    <>
      {loading &&
        <Loader />
      }
      {request &&
        <ImagesList >
          <ImageGalleryItem
            imagesArr={images}
            onClick={toggleModal}
          />
        </ImagesList>
      }
      {showModal &&
        <Modal
          imagesArr={images}
          largeImg={selectedImage}
          onCloseModal={toggleModal} />
      }
      {showButton &&
        <Button
          onClick={handleButtonClick}
        />
      }
    </>
  )
}