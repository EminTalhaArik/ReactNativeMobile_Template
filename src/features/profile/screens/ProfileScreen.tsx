import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ScreenContainer} from '@shared/components/ScreenContainer';
import {Input} from '@shared/components/Input';
import {Button} from '@shared/components/Button';
import {Text} from '@shared/components/Text';
import {profileService} from '../services/profileService';
import {Profile} from '../types';
import {normalizeError} from '@shared/utils/error';
import {ProfileCard} from '../components/ProfileCard';

const schema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
});

type FormValues = z.infer<typeof schema>;

export const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {name: ''},
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      setError(null);
      setLoading(true);
      try {
        const result = await profileService.getProfile(controller.signal);
        setProfile(result);
        reset({name: result.name});
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(normalizeError(err).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, [reset]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setError(null);
    try {
      const result = await profileService.updateProfile({name: values.name});
      setProfile(result);
    } catch (err) {
      setError(normalizeError(err).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text variant="title">Profil</Text>
      <Text variant="body" color="#6B7280">
        Hesap bilgilerini güncelle.
      </Text>

      {profile ? <ProfileCard profile={profile} /> : null}

      <Controller
        control={control}
        name="name"
        render={({field: {onBlur, onChange, value}}) => (
          <Input label="Ad" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.name?.message} />
        )}
      />

      {error ? (
        <Text variant="caption" color="#DC2626">
          {error}
        </Text>
      ) : null}

      <Button label="Kaydet" onPress={handleSubmit(onSubmit)} loading={loading} />
    </ScreenContainer>
  );
};
