import React from 'react';
import { useCurrentQuery } from '../../app/services/auth';
import { Spin } from 'antd';

export const Auth = ({children}: {children: JSX.Element}) => {

	const {isLoading} = useCurrentQuery();

	if(isLoading) {
		return <Spin />
	}

	return children
};
