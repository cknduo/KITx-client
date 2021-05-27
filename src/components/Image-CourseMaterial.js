import placeholder from '../assets/whale.svg'

const ImageCourseMaterial = ({imageFileID}) => {
// check if image is uploaded.  If not, use placeholder.
        
          if (imageFileID==="") {
            return <img src={placeholder} alt="Placeholder" width="200px"/>
          } else {
            return <img src={`/courseMaterial/image/${imageFileID}`} alt="Course" width="200px"/>
          //return null
          }

}

export default ImageCourseMaterial