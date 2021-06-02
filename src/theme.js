import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Segoe UI', 'Roboto'].join(',')
    },
    palette: {
        primary: {
            main: "#0091ca"
            // light: "#bdecff"
        }
    }
})

export default theme