import TableStudentCourses from '../components/Table-StudentCourses'


const ViewStudentCurrent = ({studentID, student}) => {   
    
    return <TableStudentCourses studentID={studentID} courseStatus={"Current"} student={student}  /*courseAdded={courseAdded}*//>

}    

export default ViewStudentCurrent

