import { AsanaLogo } from '../../components/icons';
import { Button, ButtonEnum } from '../../components/ui';
import { CLIENT_ID, REDIRECT_URI } from '../../constants';

import styles from './RegisterPage.module.scss';

export const RegisterPage = () => {
	const handleLogin = () => {
		const authUrl = `https://app.asana.com/-/oauth_authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
		window.location.href = authUrl;
	};

	return (
		<section className={styles.section}>
			<div className={styles.buttons}>
				<Button
					text='Login with ASANA'
					icon={<AsanaLogo color='white' />}
					variant={ButtonEnum.primary}
					onClick={handleLogin}
				/>
				<Button
					text='Register with ASANA'
					icon={<AsanaLogo />}
					variant={ButtonEnum.secondary}
					link='https://asana.com/create-account'
				/>
			</div>
		</section>
	);
};
