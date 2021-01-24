import React, { useState } from 'react'
import Carousel, { Modal, ModalGateway } from 'react-images'

const processImages = (images) => {
  const newImages = []
  images.forEach((img) => {
    newImages.push({ source: `${img}` })
  })
  return newImages
}

const gotoPrevious = () => {}
const gotoNext = () => {}

const ImageLightbox = ({ pos, images, onClose }) => {
  const [state, setState] = useState({
    lightboxIsOpen: true,
    currentIndex: pos,
    images: processImages(images),
  })
  return (
    <ModalGateway>
      {state.lightboxIsOpen ? (
        <Modal onClose={onClose}>
          <Carousel views={state.images} currentIndex={state.currentIndex} />
        </Modal>
      ) : null}
    </ModalGateway>
    // <Lightbox
    //   currentImage={state.currentImage}
    //   views={state.images}
    //   isOpen={state.lightboxIsOpen}
    //   onClickPrev={gotoPrevious}
    //   onClickNext={gotoNext}
    //   onClose={onClose}
    // />
  )
}

export default ImageLightbox
