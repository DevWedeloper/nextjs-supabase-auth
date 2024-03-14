import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpdateEmail from './update-email';
import UpdatePassword from './update-password';

export function UpdateCredentialsTab() {
  return (
    <Tabs defaultValue='email'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='email'>Email</TabsTrigger>
        <TabsTrigger value='password'>Password</TabsTrigger>
      </TabsList>
      <TabsContent value='email'>
        <UpdateEmail />
      </TabsContent>
      <TabsContent value='password'>
        <UpdatePassword />
      </TabsContent>
    </Tabs>
  );
}
