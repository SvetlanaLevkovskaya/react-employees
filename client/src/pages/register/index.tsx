import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Card, Form, Row, Space, Typography } from 'antd';
import { CustomInput } from '../../components/custom-input';
import { CustomPasswordInput } from '../../components/custom-password-input';
import { CustomButton } from '../../components/custom-button';
import { Link, useNavigate } from 'react-router-dom';
import { Paths } from '../../paths';
import { useRegisterMutation } from '../../app/services/auth';
import { isErrorWithMessage } from '../../utils/is-error-with-message';
import { User } from '@prisma/client';

type RegisterData = Omit<User, 'id'> & { confirmPassword: string }

export const Register = () => {
	const navigate = useNavigate()
	const [registerUser] = useRegisterMutation();
	const [error, setError] = useState('');

	const register = async (data: RegisterData) => {
		try {
			await registerUser(data).unwrap()
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

				<Card title="Sign Up" style={ { width: '30rem' } }>
					<Form onFinish={ register }>
						<CustomInput placeholder="Name" name="name" />

						<CustomInput placeholder="Email" name="email" type="email" />

						<CustomPasswordInput placeholder="Password" name="password" />

						<CustomPasswordInput placeholder="Confirm password" name="confirmPassword" />

						<CustomButton type="primary" htmlType="submit">
							Sign Up
						</CustomButton>
					</Form>

					<Space datatype="vertical" size="large">
						<Typography.Text>
							Are you already have an account? <Link to={ Paths.login }>Sign In</Link>
						</Typography.Text>
					</Space>

				</Card>
			</Row>
		</Layout>
	);
};
