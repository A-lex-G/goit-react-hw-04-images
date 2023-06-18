import { useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(null);

  const formNameGetter = (name) => {
    if (name !== "") {
      setImageName(name);
      setImages([]);
      setPage(1);
    }
  }

  return (
    <>
      <Searchbar
        onNameTransfer={formNameGetter} />
      <ImageGallery
        request={imageName}
        defaultPage={page}
        defaultImages={images}
      />
    </>
  );
}