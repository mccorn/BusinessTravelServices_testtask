import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setImages } from '../../reducers/ImagesSlice';
import { RootState } from '../../store';
import { ImageData } from '../../types';
import Modal from '../Modal/Modal';
import api from '../../api/GalleryAPI';

import './Gallery.css'
import Scrollbar from '../Scrollbar/Scrollbar';

type GalleryProps = {
  countPerScroll: number,
}

function Gallery({ countPerScroll = 4 }: GalleryProps) {
  const currentImageRef = useRef({} as ImageData);
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const { images } = useSelector((state: RootState) => state.images);

  const openModal = () => setIsOpenModal(true);

  const loadImages = () => api.getImages(countPerScroll)
    .then(data => dispatch(setImages(data)))
    .catch(console.log);

  const setSlideIdx = (idx: number) => {
    currentImageRef.current = images[idx];
    setCurrentImageIdx(idx);
    if (idx > 0.7 * images.length) loadImages();
  }

  const slides = useMemo(
    () => images.map((image: ImageData, idx: number) => (
      <div
        className="icon"
        style={{ backgroundImage: `url(${image.url})` }}
        onClick={() => setSlideIdx(idx)}
      ></div>
    )), [images])

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
          <Scrollbar
            countPerScroll={countPerScroll}
            currentSlideIdx={currentImageIdx}
            onChangeSlideIdx={setSlideIdx}
            slideConfig={{ width: 190, height: 120 }}
            slides={slides}
          />
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
