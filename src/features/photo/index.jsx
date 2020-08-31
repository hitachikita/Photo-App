import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Main from './pages/main';
import Notfound from '../../components/notfound';
import Edit from './pages/edit';
import View from './pages/view';
import Header from 'components/header';
import { useSelector } from 'react-redux';
import HeaderLogged from 'components/header/logged';

Photo.propTypes = {};

function Photo(props) {
    const user = useSelector(state => state.user);
    console.log("User...", user);
    const match = useRouteMatch();
    console.log({ match });
    return (
        <div className="content">
            {!user && <Header />}
            {user && <HeaderLogged />}

            <Switch>
                <Route exact path={match.url} component={Main} />
                <Route path={`${match.url}/add`} component={Edit} />
                <Route path={`${match.url}/:photoId/edit`} component={Edit} />
                <Route path={`${match.url}/:photoId/open`} component={View} />
                <Route component={Notfound} />
            </Switch>
        </div>
    );
}

export default Photo;