import React from 'react'
import { UserContext } from '../providers/UserProvider'

export const withUser = (Component) => {
    const WrappedComponent = props => {
        return (
            <UserContext.Consumer>
            {
                user => <Component user={user} {...props} />
            }
            </UserContext.Consumer>
        )    
    }

    return WrappedComponent
}

export default withUser
