import placeholder from '../assets/whale.svg'

const ImageCourseMaterial = ({imageFileID}) => {
// check if image is uploaded.  If not, use placeholder.
        
          if (imageFileID==="") {
            return <img src={placeholder} height="200px" width="200px"/>
          } else {
            return <img src={`/courseMaterial/image/${imageFileID}`} height="200px" width="200px"/>
          }


}

export default ImageCourseMaterial