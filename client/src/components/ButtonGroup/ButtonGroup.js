import React, { useState } from "react";
import { Form, Field } from 'formik';
import './ButtonGroup.css'



  const ButtonGroup = ({name}) => {
  const [activity, setActivity] = useState({
    asname: false,
    yes: true,
    no: false,
  })

  function classChanged (e) {
    const value = e.target.value
    setActivity({...activity,
      asname: false, yes: false, no: false, 
      [value]: true})
  }
   
    return(
        <div class="group" >
          <label>
            <Field type="radio" class="custom-radio" name={name} value="asname" onClick={classChanged} />
        <div className={activity.asname ? 'card getactive' : 'card'} >
            <div class="mx-auto mb-3">
               <span class="badge badge-pill badge-secondary">Yes</span>
            </div>
            <h5 >The Domain should exactly match the name</h5>
         </div>
          </label>
          <label>
            <Field type="radio" class="custom-radio" name={name} value="yes" onClick={classChanged} />
          <div className={activity.yes ? 'card getactive' : 'card'} >
            <div class="mx-auto mb-3">
               <span class="badge badge-pill badge-secondary">Yes</span>
            </div>
            <h5 >But minor variations are allowed (Recommended)</h5>
         </div>
          </label>
          <label>
            <Field type="radio" className="custom-radio" name={name} value="no" onClick={classChanged} />
          <div className={activity.no ? 'card getactive' : 'card'}>
            <div class="mx-auto mb-3">
               <span class="badge badge-pill badge-secondary">No</span>
            </div>
            <h5 > I am only looking for a name, not a Domain</h5>
          </div>
          </label>
        </div>
          
    )

}
export default ButtonGroup