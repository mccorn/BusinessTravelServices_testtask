import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Gallery.css'
import classNames from 'classnames';
import Modal from '../Modal/Modal';

type ImageData = {
  height: number,
  width: number,
  id: string,
  url: string,
}

function Gallery() {
  const currentImageRef = useRef({} as ImageData);
  const firstLoadRef = useRef(false);
  const [images, setImages] = useState([] as ImageData[]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const openModal = () => setIsOpenModal(true);

  useLayoutEffect(() => {
    if (firstLoadRef.current === false) {
      firstLoadRef.current = true;
      fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(data => {
          setImages(data);
          currentImageRef.current = data[currentImageIdx];
        });
    }

  }, []);

  const setSlideIdx = (idx: number) => {
    currentImageRef.current = images[idx];
    setCurrentImageIdx(idx);
  }

  return (
    <>
      <div className="gallery">
        <div className="gallery__body">
          {images && (
            <>
              <div className="gallery__image gallery__image_prev" onClick={() => setSlideIdx(currentImageIdx - 1)}>
                {images[currentImageIdx - 1] && <img src={images[currentImageIdx - 1].url} />}
              </div>
              <div className="gallery__image gallery__image_current" onClick={() => openModal()}>
                {images[currentImageIdx] && <img src={images[currentImageIdx].url} />}
              </div>
              <div className="gallery__image gallery__image_next" onClick={() => setSlideIdx(currentImageIdx + 1)}>
                {images[currentImageIdx + 1] && <img src={images[currentImageIdx + 1].url} />}
              </div>
            </>
          )}

        </div>
        <div className="gallery__footer">
          <div className="scrollbar">
            {
              images.map((image: ImageData, idx: number) => (
                <div
                  className={classNames("scrollbar__icon", {active: currentImageIdx === idx})}
                  key={image.id}
                  style={{ backgroundImage: `url(${image.url})` }}
                  onClick={() => setSlideIdx(idx)}
                ></div>
              ))
            }
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="modal__image">
          <div className="modal__imageBg" style={{backgroundImage: `url(${images[currentImageIdx]?.url})`}}></div>
          <img src={images[currentImageIdx]?.url} />
        </div>
      </Modal>
    </>
  );
}

export default Gallery
