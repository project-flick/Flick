import { useState } from 'react';
import Navbar from '../Navbar';
import './NotificationsPage.scss';
import defaultPP from '../../images/pp.png';
import {FollowButton, FollowButtonStates} from '../UI/FollowButton';

const NotifTypes = {
	FOLLOW: 'follow',
	COMMENT: 'comment',
	LIKE: 'like'
}

const NotificationsPage = (props) => {

	/*
	When fetching notifs from backend, notification must
	contain a notification "type" field that 
	renders a specific type of notification for example, a 
	follow notification will have a follow back button. 
	
	Fetched notifs must also contain UTC timestamp "time". 
	Which can be calculated as relative time in frontend.
	*/
	const [notifications] = useState([
		{
			user: 'John',
			type: NotifTypes.COMMENT,
			time: '2 hours ago'
		},
		{
			user: 'Brandon',
			type: NotifTypes.FOLLOW,
			time: '1 day ago'
		},
		{
			user: 'Kyle',
			type: NotifTypes.LIKE,
			time: '5 days ago'
		}
	])

  return (
    <>
			<Navbar/>
			<div className="notifications-page">
				<div className="notifications-wrapper">
					<h2 className="page-title">Notifications</h2>
					{notifications.map((notif, nid) => 
						<Notification key={`n_${nid}`} type={notif.type} time={notif.time} user={notif.user}/>
					)}
				</div>
			</div>
		</>
  )
}

const Notification = (props) => {

	let content = "";
	switch(props.type) {
		case NotifTypes.FOLLOW:
			content = "followed you"
			break;
		case NotifTypes.COMMENT:
			content = "commented on your photo"
			break;
		case NotifTypes.LIKE:
			content = "liked your photo"
			break;
		default:
			console.log(`Invalid notification type - ${props.type}`)
	}

	return (
		<div className="notification">
			<div className="notification-content-wrapper">
				<div className="pp-wrapper">
					<img src={defaultPP} className="pp-default" alt='default profile pic'/>
				</div>
				<div className="notification-content">
					<span>{props.user + ' ' + content}</span>
					<span>{props.time}</span>
				</div>
			</div>
			<div className="notification-actions">
				{(props.type === NotifTypes.FOLLOW) && <FollowButton user={props.user} followState={FollowButtonStates.FOLLOW_BACK}/>}
			</div>
		</div>		
	)
}

export default NotificationsPage;