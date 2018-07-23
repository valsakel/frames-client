import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CardList from './card-list';
import NavBar from './navBar';
import { fetchFrames } from '../actions/frames';
import requiresLogin from './requires-login';
import { getThisWeek } from '../actions/utils';
import {fetchEmployees} from '../actions/employee';
import PropTypes from 'prop-types';

import './styles/dashboard.css';

import './styles/dashboard.css';

export class Dashboard extends React.Component {

	componentDidMount() {
		const dates = getThisWeek();
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	render() {
		if (this.props.loading){
			return (<div>Loading...</div>);
		}
		// if (this.props.error){
		// 	return (<div>{this.props.error}</div>);
		// }

		const startSchedule = moment(getThisWeek().start).format('MMMM, DD');
		const endSchedule = moment(getThisWeek().end).format('MMMM, DD');

		return(
			<div className="dashboard">
				{/*<NavBar/>*/}
				{/*<h1*/}
					{/*className="dashboard-header"*/}
				{/*>*/}
					{/*SCHEDULE*/}
				{/*</h1>*/}
        <div className="dashboard-section-header">
          <div>{startSchedule} - {endSchedule}</div>
        </div>
				{/*<div>{startSchedule} - {endSchedule}</div>*/}
				<section className="dashboard-section">

					{this.props.frames.length
						?
						<CardList list={this.props.frames} />
						:
						<div>No data</div>
					}
				</section>
			</div>
		);
	}
}

Dashboard.propTypes = {
	frames: PropTypes.object,
	error : PropTypes.string,
	loading: PropTypes.bool,
	dispatch: PropTypes.func
};

const mapStateToProps = state => ({
	loggedIn : state.auth.user !== null,
	frames: state.frames.frames,
	loading : state.frames.loading,
	error : state.frames.error
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));