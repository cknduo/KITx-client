async function FunctionAddCourse (teacherID) {
    // Function adds a new course entry to course database and course material database
    // Intialized to empty strings, except for course name, called New Course
    // New course can be referenced by courseID

    // intialize values for databases
    const initialValuesCourseDB = {
        courseName: "NEW COURSE",
        description: "",
        preRequisites: "",
        teacherID: teacherID,
        keywords: "",
        requiredKits: { kitName: "", kitDescription: "" },
        coursePrice: "",
        courseStatus: "Draft"
    }

    //let newCourseID

    // create new entry in course DB
    try{
    let response = await fetch("/courses/addCourse",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(initialValuesCourseDB, null, 2)
        })
            //let dataCourseDB = await response.json()
            //newCourseID = dataCourseDB._id
            //console.log("courseDB initialized")
            //console.log("courseID",newCourseID)
    }    
    catch (err) {
            console.log(`Problem with posting data`, err)
        }
    

    // async function createNewCourseMaterialDBEntry() {
    //     try {
    //         let response = await fetch("/courseMaterialRecords/addCourse",
    //             {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: initialValuesCourseMaterialDB
    //             })
    //         let dataCourseMaterialDB = await response.json()
    //         //setNewCourseID(data._id)
    //         console.log("courseMaterialDBinitialized")
    //         //console.log("courseID",newCourseID)
    //     } catch (err) {
    //         console.log(`Problem with posting data`)
    //     }

    // }
    
    //     await createNewCourseDBEntry()

    // const initialValuesCourseMaterialDB = {
    //     courseID: newCourseID
    // }

    // createNewCourseMaterialDBEntry()

    console.log("new course added")

    return
}
   
export default FunctionAddCourse