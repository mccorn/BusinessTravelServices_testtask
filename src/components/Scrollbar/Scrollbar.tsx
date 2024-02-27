import { ReactNode, useEffect, useState } from 'react';
import './Scrollbar.css'
import classNames from 'classnames';

const defaultSlideConfig = {
  width: 90,
  height: 60,
}

type ScrollbarProps = {
  countPerScroll: number,
  slides: ReactNode[],
  currentSlideIdx: number,
  onChangeSlideIdx?: (idx: number) => void,
  slideConfig: {
    width: number,
    height: number,
  }
}

function Scrollbar({ countPerScroll = 4, slides, currentSlideIdx = 0, slideConfig = defaultSlideConfig }: ScrollbarProps) {
  const [transform, setTransform] = useState("translateX(0px)");

  const calcTransform = (idx: number) => {
    if (idx + 1 < Math.ceil(countPerScroll / 2)) return `translateX(0px)`;

    const dIdx = idx + 1 - countPerScroll / 2;
    return `translateX(${-dIdx * slideConfig.width + (countPerScroll % 2 ? 0 : -slideConfig.width * 0.5)}px)`;
  }

  useEffect(() => {
    setTransform(calcTransform(currentSlideIdx));
  }, [currentSlideIdx])

  return (
    <div className="scrollbar" style={{ width: slideConfig.width * countPerScroll }}>
      <div className="scrollbar__body" style={{ transform: transform }}>
        {slides.map((slide, idx) => (
          <div key={idx}
            className={classNames("scrollbar__slide", { active: currentSlideIdx === idx })}
            style={{ width: `${slideConfig.width}px`, height: `${slideConfig.height}px` }}
          >
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scrollbar
