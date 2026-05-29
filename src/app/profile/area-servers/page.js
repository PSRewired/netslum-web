import MyAreaServerList from '@/components/AreaServer/MyAreaServerList.js';

export const metadata = {
  title: 'My Area Servers',
};

export default async function MyAreaServersPage() {
  return <MyAreaServerList />;
}
