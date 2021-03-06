import React from 'react';
import { connect}  from 'react-redux';
import moment from 'moment';

import {getThisMonth, getThisWeek, getToday} from '../actions/utils';
import {setFramesView, fetchFrames} from '../actions/frames';

import './styles/schedule-view.css';

export class ScheduleView extends React.Component {

	handleDaily(){
		const dates = getToday();
		this.props.dispatch(setFramesView('daily'));
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	handleWeekly(){
		const dates = getThisWeek();
		this.props.dispatch(setFramesView('weekly'));
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	handleMonthly(){
		const dates = getThisMonth();
		this.props.dispatch(setFramesView('monthly'));
		this.props.dispatch(fetchFrames(dates.start, dates.end));
	}

	render(){
		let startSchedule = moment(getThisWeek().start).format('MMMM, Do');
		let endSchedule = moment(getThisWeek().end).format('MMMM, Do');
		if (this.props.view === 'daily'){
			startSchedule = moment(getToday().start).format('MMMM, Do');
			endSchedule = moment(getToday().end).format('MMMM, Do');
		}
		if (this.props.view === 'monthly'){
			startSchedule = moment(getThisMonth().start).format('MMMM, Do');
			endSchedule = moment(getThisMonth().end).format('MMMM, Do');
		}

		return (
			<div className="view-filter">
				<h3>{startSchedule} - {endSchedule}</h3>
				<div className="view-filter-btns">
					<button
						className={this.props.view === 'daily' ? 'active view-btn' : 'view-btn'} title="Daily Schedule"
						onClick={() => this.handleDaily()}
					>
            Daily
					</button>
					<button className={this.props.view === 'weekly' ? 'active view-btn' : 'view-btn'} title="Weekly Schedule"
						onClick={() => this.handleWeekly()}
					>
            Weekly
					</button>
					<button className={this.props.view === 'monthly' ? 'active view-btn' : 'view-btn'} title="Monthly Schedule"
						onClick={() => this.handleMonthly()}
					>
            Monthly
					</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		view : state.frames.view
	};
};

export default connect(mapStateToProps)(ScheduleView);