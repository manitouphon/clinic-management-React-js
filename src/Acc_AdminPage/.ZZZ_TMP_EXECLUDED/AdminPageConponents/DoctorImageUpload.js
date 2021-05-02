import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

const useStyles = makeStyles({
    imageUpload: {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        fontFamily: "sans-serif"
    },
    App:{
        minHeight:'100vh',
        background: "#35297a",
        display: "flex"

    },
    container:{
       margin: "auto",
       width: "100%",
       maxHeight:"600px"
    },
    errorMsg:{
        color: "red",
        fontSize:"24px",
        margin:"3px 0"
    },
    imgPreview:{
        width: "100%",
        height:"460px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        textAlign:"#fff",
       
    },
 



})
function DoctorImageUpload() {
    const [imagePreview, setImagePreview] = useState(null)
    const [error, setError] = useState(null)

    const classes = useStyles()
    const handleImageChange = (e) => {
        const selected = e.target.files[0];
        const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(selected);
            }
            reader.readAsDataURL(selected);
        } else {
            setError(true);
            console.log("The file does not support");
        }
    };
    return (
        <div className={classes.imageUpload}>
            <div className={classes.App}>
                <div className={classes.container}>
                    {error && <p className={classes.errorMsg}>File not supported </p>}
                    <div className={classes.imgPreview}>
                        {!imagePreview && (
                            <>
                                <p>Add an image</p>
                                <label htmlFor="fileUpload" className="cutomFileUpload">
                                    Choose file
                                </label>
                                <input type="file" className="fileUpload" onChange={handleImageChange} />
                                <span>jpg, jpeg,or png</span>
                            </>
                        )}
                    </div>

                </div>

            </div>

        </div>

    )
}

export default DoctorImageUpload
