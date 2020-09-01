import React from 'react';

import { getAccessTokenCookie } from '../../tools/auth';
import { isUndefined } from '../../tools/helpers';

import { performLogout } from '../../actions/auth.actions';

/**
 * Wraps a container with logic to lookup a token, and redirect
 *  to login if unauthenticated. Returns a Higher Order Component (HOC).
 *
 * @param {Component} Container - the container required to wrap auth logic
 * @returns {Component} Container - the modified container component
 */
export default function withAuthentication(Container) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            
            this.accessToken = null;
            this.verifyToken(props);
        }
        
        componentDidUpdate() {
            this.verifyToken(this.props);
        }
        
        /**
         * If no cookie is found, redirect to login page
         * @param {object} props - containing `history`, used for a redirect
         */
        verifyToken({ history }) {
            this.accessToken = getAccessTokenCookie();
            if (isUndefined(this.accessToken) && history.location.pathname !== '/') {
                history.push('/');
            }
        }
        
        /// handler for dispatching a logout from the wrapped container.
        handleLogoutUser = () => {
            const { dispatch } = this.props;
            dispatch && dispatch(performLogout());
        }
        
        render() {
            const containerProps = {
                ...this.props,                        // pass along given props to the container
                accessToken: this.accessToken,        // provide accessToken to the container
                onLogoutUser: this.handleLogoutUser,  // pass ability to logout to the container
            };
            
            return (
                <Container { ...containerProps } />
            );
        }
    };
};
