import React, { FC } from 'react';
import { Button, Form } from 'antd';

type Props = {
	children: React.ReactNode
	htmlType?: 'button' | 'submit' | 'reset' | undefined
	onClick?: () => void
	type?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined
	danger?: boolean
	loading?: boolean
	shape?: 'default' | 'circle' | 'round' | undefined
	icon?: React.ReactNode
}
   export const CustomButton: FC<Props> = ({
																					children,
																					htmlType = 'button',
																					type,
																					danger,
																					loading,
																					onClick,
																					shape,
																					icon,
																				}) => {
	return (
		<Form.Item>
			<Button htmlType={ htmlType }
							type={ type }
							danger={ danger }
							loading={ loading }
							onClick={ onClick }
							shape={ shape }
							icon={ icon }>
				{ children }
			</Button>
		</Form.Item>

	);
};
