import React, { useState, useCallback, useEffect } from 'react'
import UserLayout from '../../../hoc/UserLayout'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@material-ui/core/CircularProgress'

const showFileListHandler = ({ files }) =>
  files
    ? files.map((item, i) => (
        <li key={i}>
          <Link to={`/api/users/download/${item}`} target='_top'>
            {item}
          </Link>
        </li>
      ))
    : null

const getUploadedFilesHandler = async ({ setState }) => {
  const { data } = await axios.get('/api/users/admin_files')
  setState((state) => ({
    ...state,
    files: data,
  }))
}

const handleDrop = async ({ files, setState }) => {
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

  const { data } = await axios.post('/api/users/uploadfile', formData, config)
  setState((state) => ({
    ...state,
    formSuccess: data.success,
    formError: false,
    uploading: false,
    files: [...state.files, data.filename],
  }))
  setTimeout(() => {
    setState((state) => ({
      ...state,
      formSuccess: false,
    }))
  }, 2000)
}

const AddFile = () => {
  const [state, setState] = useState({
    formSuccess: false,
    formError: false,
    uploading: false,
    files: [],
  })
  const { formSuccess, formError, uploading, files } = state
  const onDrop = useCallback(
    async (files) => await handleDrop({ files, setState }),
    []
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  const getUploadedFiles = () => getUploadedFilesHandler({ setState })
  const showFileList = () => showFileListHandler({ files })

  useEffect(() => {
    getUploadedFiles()
  }, [])

  return (
    <UserLayout>
      <h1>Upload file</h1>
      <div>
        <div className='dropzone clear'>
          <div {...getRootProps()} className='dropzone_box'>
            <div className='wrap'>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            <input {...getInputProps()} />
          </div>
          {/* {showUploadedImages()} */}
          {uploading && (
            <div
              className='dropzone_box'
              style={{ textAlign: 'center', paddingTop: '60px' }}
            >
              <CircularProgress style={{ color: '#00bcd4' }} thickness={7} />
            </div>
          )}
        </div>
        {formSuccess && <div className='form_success'>Success</div>}
        {formError && <div className='error_label'>Please check your data</div>}
        <hr />
        <div>
          <ul>{showFileList()}</ul>
        </div>
      </div>
    </UserLayout>
  )
}

export default AddFile
