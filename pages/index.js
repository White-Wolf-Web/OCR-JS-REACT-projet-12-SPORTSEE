import React, { useState, useEffect } from "react";
import styles from "../styles/page.module.css";
import Title from "../components/title/Title.js";
import DailyActivity from "../components/dailyActivity/DailyActivity";
import ASDuration from "../components/averageSessionDuration/AverageSessionDuration";
import Intensity from "../components/intensity/Intensity";
import Score from "../components/score/Score";
import Energies from "../components/energie/Energies";
import User from "../models/User";
import Performance from "../models/Performance";
import AverageSessions from "../models/AverageSessions";
import Activity from "../models/Activity";
import { USER_MAIN_DATA, USER_ACTIVITY, USER_PERFORMANCE, USER_AVERAGE_SESSIONS } from "../data/mock";
import { useRouter } from 'next/router';

export default function Home() {
	const router = useRouter();
	const id = 18;
	const [user, setUser] = useState(null);
	const [performance, setPerformance] = useState(null);
	const [averageSessions, setAverageSessions] = useState(null);
	const [activity, setActivity] = useState(null);

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'false') {
		  router.push(`/user/${id}`);
		}
	  });

	useEffect(() => {
		const userData = USER_MAIN_DATA.find((data) => data.id === id);
		if (userData) {
			const score = userData.todayScore !== undefined ? userData.todayScore : userData.score !== undefined ? userData.score : 0;
			const keyData = userData.keyData;
			userData.score = score;
			userData.todayScore = score;
			userData.keyData = keyData;
			const userInstance = new User(userData);
			setUser(userInstance);
		}
	}, [id]);

	useEffect(() => {
		const activityData = USER_ACTIVITY.find((data) => data.userId === id);
		if (activityData) {
			const activityInstance = new Activity(activityData);
			setActivity(activityInstance);
		}
	}, [id]);

	useEffect(() => {
		const performanceData = USER_PERFORMANCE.find((data) => data.userId === id);
		if (performanceData) {
			const performanceInstance = new Performance(performanceData);
			setPerformance(performanceInstance);
		}
	}, [id]);

	useEffect(() => {
		const averageSessionsData = USER_AVERAGE_SESSIONS.find((data) => data.userId === id);
		if (averageSessionsData) {
			const averageSessionsDataInstance = new AverageSessions(averageSessionsData);
			setAverageSessions(averageSessionsDataInstance);
		}
	}, [id]);

	if (!user) {
		return null;
	}
	return (
		<>
			<div className={styles.main}>
				<Title user={user} />
				<DailyActivity className={styles.dailyActivity} activity={activity} userId={id} />
				<Energies className={styles.energies} user={user} />

				<div className={styles.trainingBoxes}>
					<ASDuration averageSessions={averageSessions} userId={id} />
					<Intensity performance={performance} userId={id} />
					<Score user={user} />
				</div>
			</div>
		</>
	);
}
