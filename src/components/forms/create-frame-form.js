import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import {addFrame,clearFrameError} from '../../actions/frames';
import {hideModal} from '../../actions/modals';

import '../styles/app.css';

export class CreateFrameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			frameError: null
		};
	}

	handleSubmit (e) {
		e.preventDefault();
		const data = new FormData(e.target);
		const newFrame = {
			employeeId : data.get('employee-select'),
			startFrame : data.get('startDate'),
			endFrame : data.get('endDate')
		};

		//Check to see if frame is 'open' and set employeeID to null
		if (newFrame.employeeId === 'open'){
			newFrame.employeeId = null;
		}
		this.props.dispatch(addFrame(newFrame));
	}

	validateFrame() {
		// Validate that the endFrame is later than the start frame
		const start = new Date(document.getElementById('startDate').value);
		const end = new Date(document.getElementById('endDate').value);

		if(start > end){
			this.setState({frameError : 'The end of the shift must be later than the start'});
		} else if (start.getDate() !== end.getDate()){
			this.setState({frameError : 'The shift may only be scheduled for one day, if you need to schedule multiple days, please create multiple frames.'});
		} else {
			this.setState({frameError : null});
		}
	}

	handleCancel() {
		this.props.dispatch(clearFrameError());
		this.props.dispatch(hideModal());
	}

	render() {
		// Alert user if unable to submit form
		let error = null;
		if (this.props.error) {
			error = (
				<div className="form-modal-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

    if (this.state.frameError) {
      error = (
        <div className="form-modal-error" aria-live="polite">
          {this.state.frameError}
        </div>
      );
    }

		const defaultStart = moment().format().slice(0,-9);
		const defaultEnd = moment().format().slice(0,-9);

		return (
			<React.Fragment>
				<div className="modal-form-wrapper">
          <button
						className="modal-close-btn"
						title="Close create frame form"
						onClick={() => this.handleCancel()}>
					</button>
					<div className="form-wrapper">
						<h2 className='form-header'>Create Frame</h2>
						<form onSubmit={e => this.handleSubmit(e)}>
							<fieldset>
								<legend>Add Frame</legend>
								<div className="form-field">
									<label htmlFor='employee-select'>Employee</label>
									<select
										id="employee-select"
										name="employee-select"
										autoFocus
									>
										{this.props.employees.map((employee, i) =>
											<option key={i} value={employee.id}>
												{`${employee.firstname} ${employee.lastname}`}
											</option>
										)}
										<option value='open'>OPEN</option>
									</select>
								</div>

								<div className="form-field">
									<label htmlFor="startDate">From</label>
									<input
										name="startDate"
										id="startDate"
										type="datetime-local"
										defaultValue={defaultStart}
										onChange={() => this.validateFrame()}
									/>
								</div>
								<div className="form-field">
									<label htmlFor="endDate">To</label>
									<input
										name="endDate"
										id="endDate"
										type="datetime-local"
										defaultValue={defaultEnd}
										onChange={() => this.validateFrame()}
									/>
								</div>
								<div className="form-field form-btns">
									<button className="form-submit-btn" type="submit">Save</button>
									<button className="form-reset-btn" type="button" onClick={() => this.handleCancel()}>Cancel</button>
								</div>
								{error}
							</fieldset>
						</form>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

CreateFrameForm.propTypes = {
	show: PropTypes.bool,
	dispatch: PropTypes.func,
	error : PropTypes.any,
	employees : PropTypes.array
};

const mapStateToProps = state => {
	return {
		employees: state.employees.employees,
		error: state.frames.error
	};
};

export default connect(mapStateToProps)(CreateFrameForm);