import React, { useEffect } from "react";
import { Overlay, Instance } from './Modal.styled';

export const Modal = ({imagesArr, largeImg, onCloseModal}) => {
  // const [image, setImage] = useState(null);

  

  const handleMouseClose = e => {
    if (e.currentTarget === e.target) {
      onCloseModal(e)
    }
  }

  useEffect(() => {
    const handleEscClose = e => {
      if (e.key === 'Escape') {
        onCloseModal(e);
      }
    }

    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [onCloseModal]);

  return (
    imagesArr.map((image) => (
      <Overlay
        key={image.id}
        onClick={handleMouseClose}>
        <Instance>
          <img
            src={largeImg}
            alt={image.tags}
          />
        </Instance>
      </Overlay>
    ))
  )
}