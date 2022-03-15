mport * as Realm from 'realm-web';

export const APP_ID = 'flexform-ggkwy';
const graphqlUrl = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;

// Connect to your MongoDB Realm app
const app = new Realm.App(APP_ID);

// Get a valid Realm user access token to authenticate requests
async function getValidAccessToken(): Promise<string> {
	if (!app.currentUser)
		// If no user is logged in, log in an anonymous user
		await app.logIn(Realm.Credentials.anonymous());
	else
		// The logged in user's access token might be stale,
		// Refreshing custom data also refreshes the access token
		await app.currentUser.refreshCustomData();

	// Get a valid access token for the current user
	localStorage.setItem('token', app.currentUser.accessToken);
	return app.currentUser.accessToken;
}

export {
	graphqlUrl,
	getValidAccessToken
};