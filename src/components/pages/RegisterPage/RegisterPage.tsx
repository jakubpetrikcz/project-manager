import { CLIENT_ID, REDIRECT_URI } from '../../../constants';
import { Button, ButtonEnum } from '../../atoms';
import { AsanaLogo } from '../../ui/icons';

import styles from './RegisterPage.module.scss';

export const RegisterPage = () => {
	const handleLogin = () => {
		const authUrl = `https://app.asana.com/-/oauth_authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=thisIsARandomString&code_challenge_method=S256&code_challenge=671608a33392cee13585063953a86d396dffd15222d83ef958f43a2804ac7fb2&scope=default`;
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
