import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

export async function checkAuthState() {
  try {
    const [user, session] = await Promise.all([
      getCurrentUser().catch(() => null),
      fetchAuthSession().catch(() => null),
    ]);

    const tokens = session?.tokens;
    const accessToken = tokens?.accessToken;

    const cognitoGroups = accessToken?.payload?.['cognito:groups'];
    const groups = Array.isArray(cognitoGroups) ? cognitoGroups : [];
    const isAdmin = groups.includes('Admins');

    const isAuthenticated = !!(user && tokens);

    const result = {
      isAuthenticated,
      isAdmin,
      user: isAuthenticated ? { ...user, username: user.username || 'User' } : null,
    };

    console.log('[checkAuthState] Result:', result); // Debug log

    return result;
  } catch (error) {
    console.error('[checkAuthState] Error:', error);
    return { isAuthenticated: false, isAdmin: false, user: null };
  }
}
