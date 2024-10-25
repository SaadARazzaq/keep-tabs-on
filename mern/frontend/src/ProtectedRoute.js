// import React from 'react';
// import { Route, Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = () => {
//         // Check if user data is stored in localStorage or if a session exists
//         return localStorage.getItem('userId') || sessionStorage.getItem('userId');
//     };

//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 isAuthenticated() ? (
//                     <Component {...props} />
//                 ) : (
//                     <Navigate to="/signin" /> // Use Navigate to redirect in v6
//                 )
//             }
//         />
//     );
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        return localStorage.getItem('userId') || sessionStorage.getItem('userId');
    };

    return isAuthenticated() ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
