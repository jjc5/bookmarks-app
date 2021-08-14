import React from 'react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import routes from './routes';
import Show from '../pages/Post.js';
const AppRouter = () => {
	return (
		<Router>
			<NavBar routes={routes} />
			<Switch>
				{routes.map(({ Component, key, path }) => (
					<Route
						key={key}
						path={path}
						exact
						component={() => <Component page={key} />}
					></Route>
				))}
				<Route
					path={'/:id'}
					render={routerProps => <Show {...routerProps} />}
				></Route>
			</Switch>
		</Router>
	);
};

export default AppRouter;
