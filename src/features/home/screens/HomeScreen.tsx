import React from 'react';
import {View} from 'react-native';
import {ScreenContainer} from '@shared/components/ScreenContainer';
import {Text} from '@shared/components/Text';
import {Button} from '@shared/components/Button';
import {Card} from '@shared/components/Card';
import {useThemePreference} from '@shared/hooks/useThemePreference';
import {useUser} from '@clerk/clerk-expo';

export const HomeScreen: React.FC = () => {
  const {toggle, preference} = useThemePreference();
  const {user} = useUser();

  return (
    <ScreenContainer>
      <Text variant="title">Modüler React Native Template</Text>
      <Text variant="body" color="#6B7280">
        SOLID prensipleriyle sürdürülebilir mimari için hazır yapı.
      </Text>

      <Card>
        <Text variant="subtitle">Tema</Text>
        <Text variant="body" color="#6B7280">
          Aktif tercih: {preference}
        </Text>
        <View style={{marginTop: 16}}>
          <Button label="Tema Değiştir" variant="secondary" onPress={toggle} />
        </View>
      </Card>

      <Card>
        <Text variant="subtitle">Hoş geldin</Text>
        <Text variant="body">{user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? 'Anonim Kullanıcı'}</Text>
      </Card>
    </ScreenContainer>
  );
};
