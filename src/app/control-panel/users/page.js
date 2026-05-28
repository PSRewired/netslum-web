import AuthUserList from '../../../components/Users/AuthUserList.js';

export const metadata = {
  title: 'User Management',
};

export default async function AuthUsersPage() {
  return <AuthUserList />;
}
