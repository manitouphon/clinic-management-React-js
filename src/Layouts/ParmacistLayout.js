import { makeStyles } from '@material-ui/core'
import React from 'react'
const useStyles = makeStyles({
    page:{

    }
        
})
function ParmacistLayout({children}) {
const classes = useStyles()
    return (
        <div>
            <div className={classes.page}>
                {children}
            </div>
        </div>
    )
}

export default ParmacistLayout
