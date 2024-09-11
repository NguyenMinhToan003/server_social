import cloudinary from '~/config/cloudinary'

export const uploadFiles = async (files) => {
  console.log(files)
  const uploadResult = cloudinary.uploader
  files.map(async (file) => {
    await cloudinary.uploader.upload(file, {
      upload_preset: 'upload_preset'
    })
  })
    .catch((error) => {
      console.log(error)
    })

  return uploadResult
}
