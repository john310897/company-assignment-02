import React, { useState, useEffect } from 'react'
import RegistrationService from '../services/RegistrationService'
import * as appConstants from '../Constants';
import RegistrationList from './RegistrationList';
import { Button } from 'react-bootstrap';
import Select from './Select';

function Home() {
	const [registration, setRegistration] = useState({})
	const [states, setStates] = useState(appConstants.states)
	const [registrationList, setRegistrationList] = useState({ data: [] })

	useEffect(() => {
		getAllData()
	}, [])
	const getAllData = () => {
		RegistrationService.getAllData().then(resp => {
			console.log(resp?.data)
			registrationList.data = resp?.data
			setRegistrationList({ ...registrationList, data: resp?.data })
		})
	}
	const handleChange = (e) => {
		const { name, value } = e.target;
		setRegistration({ ...registration, [name]: value })
	}
	const handleSubmit = () => {
		console.log(registration)
		if (registration?.id) {
			RegistrationService.updateRegistrationData(registration?.id, registration).then(resp => {
				setRegistration({})
				registrationList.data = resp?.data
				setRegistrationList({ ...registrationList, data: resp?.data })

			})
		} else {
			RegistrationService.createRegistrationData(registration).then(resp => {
				setRegistration({});
				registrationList.data = resp?.data
				setRegistrationList({ ...registrationList, data: resp?.data })
			})
		}

	}
	const handleEdit = (data) => {
		setRegistration(data)
	}
	const handleDelete = (id) => {
		RegistrationService.deleteRegistrationData(id).then(resp => {
			registrationList.data = resp?.data
			setRegistrationList({ ...registrationList, data: resp?.data })
		})
	}
	return (
		<div>
			<div className='reg_box'>
				<label>Registration</label>
				<input name='name' onChange={handleChange} value={registration?.name ?? ''} placeholder='Name' />
				<input name='mobile_no' onChange={handleChange} value={registration?.mobile_no ?? ''} placeholder='Phone no' />
				<Select
					name='state'
					options={Object?.keys(states)}
					value={registration?.state ?? ''}
					onChange={handleChange}
				/>
				<Select
					name='city'
					options={states[registration?.state]}
					value={registration?.city ?? ''}
					onChange={handleChange}
				/>
				<Button variant='success' onClick={handleSubmit}>{registration?.id ? "UPDATE" : "SUBMIT"}</Button>
				{registration?.id &&
					<Button variant='warning' onClick={() => setRegistration({})}>CANCEL</Button>
				}
			</div>
			<br />
			<RegistrationList
				headers={appConstants.table_headers}
				tableData={registrationList?.data}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
			/>
		</div>
	)
}

export default Home