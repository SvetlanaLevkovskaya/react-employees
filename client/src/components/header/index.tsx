import React from 'react';
import { Layout as AntLayout, Space, Typography } from 'antd';
import styles from './index.module.css';
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { CustomButton } from '../custom-button';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Header = () => {
	return (
		<AntLayout.Header className={ styles.header }>
			<Space>
				<TeamOutlined className={ styles.teamIcon } />

				<Link to={ Paths.home }>
					<CustomButton type="ghost">
						<Typography.Title level={ 1 }>Employee</Typography.Title>
					</CustomButton>
				</Link>

			</Space>

			<Space>
				<Link to={ Paths.register }>
					<CustomButton type="ghost" icon={<UserOutlined/>}>Sign Up</CustomButton>
				</Link>

				<Link to={ Paths.login }>
					<CustomButton type="ghost" icon={<LoginOutlined/>}>Sign Ip</CustomButton>
				</Link>
			</Space>
		</AntLayout.Header>
	);
};
