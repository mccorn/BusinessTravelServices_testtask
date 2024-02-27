import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './Gallery.css'
import classNames from 'classnames';
import Modal from '../Modal/Modal';
import api from '../../GalleryAPI';

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
  const [transform, setTransform] = useState("translateX(0px)");
  const countPerScroll = 10;

  const openModal = () => setIsOpenModal(true);
  const loadImage = () => api.getImages(1)
    .then(data => {
      setImages([...images, ...data]);
    })
    .catch(console.log);

  useLayoutEffect(() => {
    if (firstLoadRef.current === false) {
      firstLoadRef.current = true;
      api.getImages(countPerScroll)
        .then(data => {
          setImages(data);
          currentImageRef.current = data[currentImageIdx];
        })
        .catch(console.log);
    }

  }, []);

  useEffect(() => {
    setTransform(calcTransform(currentImageIdx));
  }, [currentImageIdx])

  const setSlideIdx = (idx: number) => {
    currentImageRef.current = images[idx];
    setCurrentImageIdx(idx);

    if (idx > 0.7 * images.length) loadImage();
  }

  const calcTransform = (idx: number) => {
    if (idx < Math.ceil(countPerScroll / 2)) return `translateX(0px)`;

    const dIdx = idx + 1 - countPerScroll / 2;
    return `translateX(${-dIdx * 90 + 45}px)`;
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
          <button onClick={() => setSlideIdx(currentImageIdx - 1)} disabled={currentImageIdx <= 0}>{"<<"}</button>
          <div className="scrollbar">
            <div className="scrollbar__body" style={{ transform: transform }}>
              {
                images.map((image: ImageData, idx: number) => (
                  <div
                    className={classNames("scrollbar__icon", { active: currentImageIdx === idx })}
                    key={image.id}
                    style={{ backgroundImage: `url(${image.url})` }}
                    onClick={() => setSlideIdx(idx)}
                  ></div>
                ))
              }
            </div>
          </div>
          <button onClick={() => setSlideIdx(currentImageIdx + 1)}>{">>"}</button>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="modal__image">
          <div className="modal__imageBg" style={{ backgroundImage: `url(${images[currentImageIdx]?.url})` }}></div>
          <img src={images[currentImageIdx]?.url} />
        </div>
      </Modal>
    </>
  );
}

export default Gallery
