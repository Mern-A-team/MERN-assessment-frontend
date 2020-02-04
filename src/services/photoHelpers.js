// import API from "../axios.config"
// import s3 from '../s3-config'
// let basePath = process.env.NODE_ENV === "production" ? "/production" : "/dev"


// export const getImage = async (fileRef) => {
//     try {
//         // Replace '/' with '_##_' in imageKey
//         const key = s3.replace(`/photos/${props.match.params.fileRef}`)
//         console.log("getting image:", key)
//         const response = await API.get(`${basePath}/photos/${key}`)
//         return response.data
//     }
//     catch(error) {
//         console.log(`Got an error from get image: ${error}`)
//     }
// }
