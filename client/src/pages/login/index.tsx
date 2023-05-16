import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Card, Form, Row, Space, Typography } from 'antd';
import { CustomInput } from '../../components/custom-input';
import { CustomPasswordInput } from '../../components/custom-password-input';
import { CustomButton } from '../../components/custom-button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useLoginMutation, UserData } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { ErrorMessage } from '../../components/error-message';

export const Login = () => {
  const navigate = useNavigate()
	const [loginUser, loginUserResult] = useLoginMutation();
	const [error, setError] = useState('');

	const login = async (data: UserData) => {
		try {
			await loginUser(data).unwrap()
			navigate('/')
		} catch (e) {
			const maybeError = isErrorWithMessage(e);

			if (maybeError) {
				setError(e.data.message);
			} else {
				console.log(e)
				setError('Unknown error');
			}
		}
	}

	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Sign In" style={ { width: '30rem' } }>
					<Form onFinish={ login }>
						<CustomInput placeholder="Email" name="email" type="email" />

						<CustomPasswordInput placeholder="Password" name="password" />

						<CustomButton type="primary" htmlType="submit">
							Sign In
						</CustomButton>
					</Form>

					<Space datatype="vertical" size="large">
						<Typography.Text>
							Do not have an account? <Link to={ Paths.register }>Sign Up</Link>
						</Typography.Text>

						<ErrorMessage message={error}/>

					</Space>

				</Card>
			</Row>
		</Layout>
	);
};

