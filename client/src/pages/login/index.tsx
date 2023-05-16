import React from 'react';
import Layout from '../../components/layout';
import { Card, Form, Row, Space, Typography } from 'antd';
import { CustomInput } from '../../components/custom-input';
import { CustomPasswordInput } from '../../components/custom-password-input';
import { CustomButton } from '../../components/custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Login = () => {
	return (
		<Layout>
			<Row align="middle" justify="center">
				<Card title="Sign In" style={ { width: '30rem' } }>
					<Form onFinish={ () => null }>
						<CustomInput placeholder="Email" name="email" type="email" />

						<CustomPasswordInput placeholder="Password" name="password" />

						<CustomButton type="primary" htmlType="submit">
							Sign In
						</CustomButton>
					</Form>

					<Space datatype="vertical" size="large">
						<Typography.Text>
							Do not have an account? <Link to={Paths.register}>Sign Up</Link>
						</Typography.Text>
					</Space>

				</Card>
			</Row>
		</Layout>
	);
};

