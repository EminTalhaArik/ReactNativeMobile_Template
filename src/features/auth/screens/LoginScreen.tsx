import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSignIn} from '@clerk/clerk-expo';
import {ScreenContainer} from '@shared/components/ScreenContainer';
import {Input} from '@shared/components/Input';
import {Button} from '@shared/components/Button';
import {Text} from '@shared/components/Text';
import {normalizeError} from '@shared/utils/error';
import {authService} from '../services/authService';
import {AuthStackParamList} from '@app/navigation/types';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

const loginSchema = z.object({
  email: z.string().email('Geçerli bir e-posta girin'),
  password: z.string().min(6, 'Şifre minimum 6 karakter olmalı'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {control, handleSubmit, formState} = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: '', password: ''},
  });
  const {errors} = formState;
  const {isLoaded, signIn, setActive} = useSignIn();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: LoginFormValues) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    setSubmitError(null);

    try {
      const result = await signIn.create({identifier: values.email, password: values.password});
      if (result.status === 'complete') {
        await setActive?.({session: result.createdSessionId});
        await authService.login({email: values.email, password: values.password});
      } else {
        setSubmitError('Giriş tamamlanamadı, lütfen tekrar deneyin.');
      }
    } catch (error) {
      const normalized = normalizeError(error);
      setSubmitError(normalized.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text variant="title">Tekrar Hoş Geldiniz 👋</Text>
      <Text variant="body" color="#6B7280">
        Hesabınıza giriş yapın ve çalışmaya başlayalım.
      </Text>

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <Input label="E-posta" keyboardType="email-address" autoCapitalize="none" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <Input label="Şifre" secureTextEntry value={value} onBlur={onBlur} onChangeText={onChange} error={errors.password?.message} />
        )}
      />

      {submitError ? (
        <Text variant="caption" color="#DC2626">
          {submitError}
        </Text>
      ) : null}

      <Button label="Giriş Yap" onPress={handleSubmit(onSubmit)} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text variant="caption" color="#1E88E5">
          Hesabın yok mu? Kayıt ol
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};
