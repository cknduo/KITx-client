import TableTeacherCourses from '../components/Table-TeacherCourses'


const ViewTeacherCurrent = ({teacherID}) => {   
    
    return <TableTeacherCourses teacherID={teacherID} courseStatus={"Current"}  /*courseAdded={courseAdded}*//>

}    

export default ViewTeacherCurrent