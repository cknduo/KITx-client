import placeholder from '../assets/whale.svg'

import './Image-CourseMaterial.css'

const ImageCourseMaterial = ({imageFileID}) => {
// check if image is uploaded.  If not, use placeholder.
        
          if (imageFileID==="") {
            return <img src={placeholder} alt="Placeholder" className='img-component' />
          } else {
            return <img src={`/courseMaterial/image/${imageFileID}`} alt="Course" className='img-component' />
          }

}

export default ImageCourseMaterial