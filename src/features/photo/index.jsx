import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Main from './pages/main';
import Notfound from '../../components/notfound';
import Edit from './pages/edit';
import View from './pages/view';

Photo.propTypes = {

};

function Photo(props) {
    const match = useRouteMatch();
    console.log({ match });
    return (
        <Switch>
            <Route exact path={match.url} component={Main} />
            <Route path={`${match.url}/add`} component={Edit} />
            <Route path={`${match.url}/:photoId/edit`} component={Edit} />
            <Route path={`${match.url}/:photoId/open`} component={View} />
            <Route component={Notfound} />
        </Switch>
    );
}

export default Photo;