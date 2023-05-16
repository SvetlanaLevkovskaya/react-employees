import React, { FC } from 'react';

import {Layout as AntLayout} from 'antd'
import styles from './index.module.css'
import { Header } from '../header';

type Props = {
	children: React.ReactNode
}
const Layout: FC<Props> = ({children}) => {
	return (
		<div className={styles.main}>
			<AntLayout.Content style={{height: '100%'}}>
				<Header/>
				{children}
			</AntLayout.Content>
			</div>
	);
};

export default Layout;