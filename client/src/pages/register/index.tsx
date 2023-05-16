import React from 'react';
import Layout from '../../components/layout';
import { Card, Form, Row, Space, Typography } from 'antd';
import { CustomInput } from '../../components/custom-input';
import { CustomPasswordInput } from '../../components/custom-password-input';
import { CustomButton } from '../../components/custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Register = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">

				<Card title="Sign Up" style={ { width: '30rem' } }>
					<Form onFinish={ () => null }>
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
