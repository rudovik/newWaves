import React, { useState, useEffect } from 'react'
import ImageLightbox from '../utils/ImageLightbox'

const renderCardImage = (images) => {
  if (images.length > 0) {
    return images[0].url
  } else {
    return `/images/image_not_available.png`
  }
}

const ProdImg = ({ prodDetails: { images, _id: id } }) => {
  const [state, setState] = useState({
    lightbox: false,
    imagePos: 0,
    lightboxImages: [],
  })

  const showThumbs = (images) =>
    images.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => {
            handleLightBox(i)
          }}
          className='thumb'
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      ) : null
    )

  const handleLightBox = (pos) => {
    state.lightboxImages.length > 0 &&
      setState({ ...state, lightbox: true, imagePos: pos })
  }

  const handleLightboxClose = () => {
    setState({ ...state, lightbox: false })
  }

  useEffect(() => {
    if (images.length) {
      let lightboxImages = []
      images.forEach((item) => {
        lightboxImages.push(item.url)
      })
      setState((state) => ({
        ...state,
        lightboxImages,
      }))
    }
  }, [images])

  return (
    <div className='product_image_container'>
      <div className='main_pic'>
        <div
          style={{ background: `url(${renderCardImage(images)}) no-repeat` }}
          onClick={(e) => handleLightBox(0)}
        ></div>
      </div>
      <div className='main_thumbs'>{showThumbs(images)}</div>
      {state.lightbox && (
        <ImageLightbox
          id={id}
          images={state.lightboxImages}
          open={state.open}
          pos={state.imagePos}
          onClose={handleLightboxClose}
        />
      )}
    </div>
  )
}

export default ProdImg
