import React from 'react';
import {Card} from '@shared/components/Card';
import {Text} from '@shared/components/Text';
import {Profile} from '../types';

interface ProfileCardProps {
  profile: Profile;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => (
  <Card>
    <Text variant="subtitle">Profil</Text>
    <Text variant="body">Ad: {profile.name}</Text>
    <Text variant="body">E-posta: {profile.email}</Text>
  </Card>
);
