import { makeStyles} from '@material-ui/core'
import React from 'react'
import {Fetch_data} from '../API/Fetch_data'
const useStyle = makeStyles({
    flex_container:{
        display: "flex",
        alignItems: "stretch",
        backgroundColor: '#f4f4f4',
        width: '100%'
    },
    flex_item:{
        backgroundColor:"DodgerBlue",
        color: "white",
        margin: "10px",
        textAlign: "center",
        lineHeight: "75px",
        fontSize:"30px",
        flexGrow: 1

    }

})
function AdminHomePageDefualt() {
    const classes = useStyle()
    // fetch data from doctor
        const doctor = Fetch_data('http://localhost:8000/Doctor');
        const receptnist = Fetch_data('http://localhost:8000/Receptionist');
        const parmacist = Fetch_data('http://localhost:8000/Receptionist');    
    const amount_staffs = [
        {
            "id": 1,  
            "staffType": "Doctor",
            "amount": doctor.data.length
        },
        {
            "id": 2,
            "staffType": "Parmcist",
            "amount": receptnist.data.length
        },
        {
            "id": 3,
            "staffType": "Receptionist",
            "amount": parmacist.data.length
        },

     ]
    return (
        <div>
            <div className={classes.flex_container}>
                {
                    amount_staffs.map(amount_staff =>(
                        <div className={classes.flex_item}>
                            <p>{amount_staff.staffType}</p>
                            {amount_staff.amount}
                        </div>
                    ))
                }
            </div>
            

        </div>
    )
}

export default AdminHomePageDefualt
