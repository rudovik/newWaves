import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@material-ui/core/CircularProgress'

const FileUpload = ({ imagesHandler, reset }) => {
  const onDrop = useCallback(
    async (files) => {
      // Do something with the files
      setState((state) => ({
        ...state,
        uploading: true,
      }))
      const formData = new FormData()
      const config = {
        header: { 'content-type': 'multipart/form-data' },
      }
      formData.append('file', files[0])
      const { data } = await axios.post(
        '/api/users/uploadimage',
        formData,
        config
      )
      console.log(data)
      setState((state) => {
        const uploadedFiles = [...state.uploadedFiles, data]
        imagesHandler(uploadedFiles)
        return { uploading: false, uploadedFiles }
      })
    },
    [imagesHandler]
  )

  const onRemove = async (id) => {
    await axios.get(`/api/users/removeimage?public_id=${id}`)
    let images = state.uploadedFiles.filter((item) => {
      return item.public_id !== id
    })

    setState({ ...state, uploadedFiles: images })
    imagesHandler(images)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const [state, setState] = useState({
    uploading: false,
    uploadedFiles: [],
  })

  const showUploadedImages = () =>
    state.uploadedFiles.map((item) => (
      <div
        className='dropzone_box'
        key={item.public_id}
        onClick={() => onRemove(item.public_id)}
      >
        <div
          className='wrap'
          style={{ background: `url(${item.url}) no-repeat` }}
        ></div>
      </div>
    ))

  useEffect(() => {
    reset &&
      setState((state) => ({
        ...state,
        uploadedFiles: [],
      }))
  }, [reset])

  return (
    <div>
      <section>
        <div className='dropzone clear'>
          <div {...getRootProps()} className='dropzone_box'>
            <div className='wrap'>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <input {...getInputProps()} />
          </div>
          {showUploadedImages()}
          {state.uploading && (
            <div
              className='dropzone_box'
              style={{ textAlign: 'center', paddingTop: '60px' }}
            >
              <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default FileUpload
