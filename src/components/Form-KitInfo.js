
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const FormKitInfo = ({ courseID, fileUse, course }) => {

    const classes = useStyles()

    //upload kit picture
    const validationSchema = yup.object({
        kitName: yup
            .string('Enter kit name'),
        //            .required('Kit name is required'),
        kitDescription: yup
            .string('Enter kit description'),
        //    .required('Kit description is required'),
     })

    const initialValues = {
        kitName: course.requiredKits.kitName,
        kitDescription: course.requiredKits.kitDescription,
    }
    //}   

    /* formik object to define intial values.  If the values do not match the validation Schema, form items will not be submitted */
    let formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit(values) {
            console.log("submit")
            let kitToUpdate = {
                requiredKits: { kitName: values.kitName, kitDescription: values.kitDescription },
            }
            const addCourseOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(kitToUpdate, null, 2)
            };
            fetch(`/courses/${course._id}`, addCourseOptions)
                .then(response => response.json())
        }
    });

    return (
        <div>

        <form className={classes.root} onSubmit={formik.handleSubmit}>

        <TextField
            fullWidth
            id="kitName"
            name="kitName"
            label="Kit Name"
            variant="outlined"
            style={{ margin: "16px 0px" }}
            defaultValue={course.requiredKits.kitName}
            onChange={formik.handleChange}
            error={formik.touched.kitName && Boolean(formik.errors.kitName)}
            helperText={formik.touched.kitName && formik.errors.kitName}
        />

        <TextField
            fullWidth
            multiline
            rows={4}
            id="kitDescription"
            name="kitDescription"
            label="Kit Description"
            variant="outlined"
            style={{ margin: "16px 0px" }}
            defaultValue={course.requiredKits.kitDescription}
            onChange={formik.handleChange}
            error={formik.touched.kitDescription && Boolean(formik.errors.kitDescription)}
            helperText={formik.touched.kitDescription && formik.errors.kitDescription}
        />

        <Button color="primary" variant="contained" type="submit">
            Submit
        </Button>
        </form>

        </div>
    
    )

}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(5),
    },

}));


export default FormKitInfo

