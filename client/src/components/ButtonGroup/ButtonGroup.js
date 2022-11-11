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
        <div className="group" >
          <label className={activity.asname ? 'getactive' : 'notactive'}>
            <Field type="radio" className="custom-radio" name={name} value="asname" onClick={classChanged} />
               <div className={activity.asname ? 'activeradio' : "radio"}>Yes</div>
            <p  className="radioText">The Domain should exactly match the name</p>
          </label>
          <label className={activity.yes ? 'getactive' : 'notactive'}>
            <Field type="radio" className="custom-radio" name={name} value="yes" onClick={classChanged} />
            <div className={activity.yes ? 'activeradio' : "radio"}>
               Yes
            </div>
            <p  className="radioText">But minor variations are allowed (Recommended)</p>
          </label>
          <label className={activity.no ? 'getactive' : 'notactive'}>
            <Field type="radio" className="custom-radio" name={name} value="no" onClick={classChanged} />
            <div className={activity.no ? 'activeradio' : "radio"}>
               No
            </div>
             <p className="radioText">I am only looking for a name, not a Domain</p>
          </label>
        </div>
          
    )

}
export default ButtonGroup