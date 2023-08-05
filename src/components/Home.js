import React, { useState, useEffect } from 'react'
import RegistrationService from '../services/RegistrationService'
function Home() {
	const [registration, setRegistration] = useState({})
	const [states, setStates] = useState({
		"Karnataka": [
			"Mangaluru",
			"Bengaluru",
			"Kolar"
		],
		"Maharashtra": [
			"Pune",
			"Mumbai",
			"Thane"
		]
	})
	const [citys,setCitys]=useState([])
	const getAllData = () => {

	}
	const handleChange = (e) => {
		const {name,value}=e.target;
		if(name==='state'){
			setCitys(states[value])
		}
		setRegistration({...registration,[name]:value})
	}
	const handleSubmit=()=>{
		console.log(registration)
		RegistrationService.createRegistrationData(registration).then(resp=>{
			console.log(resp?.data)
		})
	}
	return (
		<div>
			<div className='reg_box'>
				<label>Registration</label>
				<input name='name' onChange={handleChange} content={registration?.name} placeholder='Name' />
				<input name='mobile_no' onChange={handleChange} content={registration?.mobile_no} placeholder='Phone no' />
				<select name='state'
					content={registration?.state}
					onChange={handleChange}
				>
					<option>select state</option>
					{Object.keys(states)?.map((state, index) => (
						<option value={state}>{state}</option>
					))}
				</select>
				<select name='city' onChange={handleChange} content={registration?.city}>
					<option>select city</option>
					{citys?.map((city,index)=>(
						<option value={city}>{city}</option>
					))}
				</select>
				<button onClick={handleSubmit}>SUBMIT</button>
			</div>
		</div>
	)
}

export default Home