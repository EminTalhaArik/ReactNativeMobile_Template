import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSignUp} from '@clerk/clerk-react-native';
import {ScreenContainer} from '@shared/components/ScreenContainer';
import {Input} from '@shared/components/Input';
import {Button} from '@shared/components/Button';
import {Text} from '@shared/components/Text';
import {normalizeError} from '@shared/utils/error';
import {authService} from '../services/authService';
import {AuthStackParamList} from '@app/navigation/types';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Ad minimum 2 karakter'),
    email: z.string().email('Geçerli bir e-posta girin'),
    password: z.string().min(6, 'Şifre minimum 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {control, handleSubmit, formState} = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {name: '', email: '', password: '', confirmPassword: ''},
  });
  const {errors} = formState;
  const {isLoaded, signUp, setActive} = useSignUp();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async ({name, email, password}: RegisterFormValues) => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    setSubmitError(null);

    try {
      const result = await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

      if (result.status === 'complete') {
        await setActive?.({session: result.createdSessionId});
      }

      await authService.register({name, email, password});
      navigation.navigate('Login');
    } catch (error) {
      const normalized = normalizeError(error);
      setSubmitError(normalized.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Text variant="title">Aramıza Katıl 🎉</Text>
      <Text variant="body" color="#6B7280">
        Dakikalar içinde modüler uygulamanızı hazırlayın.
      </Text>

      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <Input label="Ad" value={value} onBlur={onBlur} onChangeText={onChange} error={errors.name?.message} />
        )}
      />

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({field: {onChange, onBlur, value}}) => (
          <Input label="Şifre Tekrar" secureTextEntry value={value} onBlur={onBlur} onChangeText={onChange} error={errors.confirmPassword?.message} />
        )}
      />

      {submitError ? (
        <Text variant="caption" color="#DC2626">
          {submitError}
        </Text>
      ) : null}

      <Button label="Kayıt Ol" onPress={handleSubmit(onSubmit)} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text variant="caption" color="#1E88E5">
          Hesabın var mı? Giriş yap
        </Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};
