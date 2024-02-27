import { useEffect, useRef } from 'react';
import './App.css'
import Gallery from './components/Gallery/Gallery.tsx'
import api from './api/GalleryAPI';
import { useDispatch } from 'react-redux';
import { setImages } from './reducers/ImagesSlice.ts';

function App() {
  const dispatch = useDispatch();
  const firstLoadRef = useRef(false);
  const countPerScroll = 10;

  useEffect(() => {
    if (firstLoadRef.current === false) {
      api.getImages(countPerScroll)
        .then(data => {
          dispatch(setImages(data));
          firstLoadRef.current = true;
        })
        .catch(console.log);
    }

  }, []);

  return (
    <>
      <Gallery countPerScroll={countPerScroll} />
    </>
  )
}

export default App
