import React from 'react';
import {connect} from 'react-redux';
import {showModal} from '../actions/modals';
import PropTypes from 'prop-types';
import { formatTwelveHourTime } from '../actions/utils';

export function EmployeeCard (props){

	//Format availability
	let availabilityTable;
	if (props.availability){
		const availabilityRows = props.availability.map((day,index) => {
			const startFormatted = formatTwelveHourTime(day.start);
			const endFormatted = formatTwelveHourTime(day.end);
		
			return (
				<tr key={index}>
					<td>{day.day}</td>
					<td>{startFormatted}</td>
					<td>{endFormatted}</td>
				</tr>
			);
		});
		availabilityTable = <table>
			<tbody>
				<tr>
					<th>Day</th>
					<th>Start </th>
					<th>End</th>
				</tr>
				{availabilityRows}
			</tbody>
		</table>;
	}

	let phoneNumber;
	if (props.phoneNumber){
		phoneNumber = `(${props.phoneNumber.slice(0,3)}) ${props.phoneNumber.slice(3,6)}-${props.phoneNumber.slice(6,9)}`;
	}

	return (
		<div className="employee-section-details">
			<div>
				<h3>{props.name}</h3>
				<p>{props.email}</p>
				<p>{phoneNumber}</p>
			</div>
			<div>
				<h3>Availability</h3>
				{availabilityTable}
			</div>
			<div>
				<button className="opt-btn" title="Edit Employee Info" onClick={() => props.dispatch(showModal('employee', props.id))}>
					<i className="fa fa-address-card" aria-hidden="true"></i>
				</button>
			</div>

		</div>
	);
}

EmployeeCard.propTypes = {
	name : PropTypes.string,
	email : PropTypes.string,
	phoneNumber : PropTypes.string,
	dispatch : PropTypes.func,
	id : PropTypes.string,
	availability : PropTypes.array
};

export default connect()(EmployeeCard);