# React Native Sustainable Template

## 1. Özet ve Amaç
Modüler, ölçeklenebilir ve SOLID prensiplerine uyumlu React Native projeleri için üretim seviyesinde bir başlangıç noktası sunar. Clerk ile kimlik doğrulama, tip güvenli API istemcisi, tema sistemi ve test-sürüklü bir yapı ile yeni projeleri dakikalar içinde başlatmak için kullanılmalıdır.

## 2. Önkoşullar
- Node.js >= 18, Yarn veya npm.
- Xcode + Command Line Tools (iOS), Android Studio + SDK (Android). Referans: [React Native Ortam Kurulumu](https://reactnative.dev/docs/environment-setup).
- CocoaPods (`sudo gem install cocoapods`).
- ENV değişkenleri: `CLERK_PUBLISHABLE_KEY`, `API_BASE_URL`, `API_KEY`, `APP_ENV`. Örnek için `.env.example` dosyasını kullanın.

## 3. Kurulum
```bash
git clone <repo-url>
cd ReactNativeMobile_App_Template
cp .env.example .env
# Bağımlılıkları yükleyin
yarn install
# iOS pod kurulumu (macOS)
cd ios && pod install && cd ..
```
Çalıştırma:
```bash
yarn start           # Metro bundler
yarn ios             # iOS simülatörü
yarn android         # Android emülatörü
```

## 4. Mimari ve Klasör Yapısı
```
src/
  app/           # Navigation, provider zinciri, giriş noktası
  features/      # Feature-based modüller (auth, home, profile ...)
  shared/        # Ortak bileşenler, theme, api, hooks, storage
  tests/         # Test yardımcıları ve fixture'lar
```
- Her feature: `screens/`, `components/`, `services/`, `types/` ile tek sorumluluk. UI dosyaları sadece view mantığı içerir, iş kuralları service katmanına taşınır.
- `shared` katmanı tekrar kullanılan kodları barındırır (tema, API istemcisi, Depolama, hooklar).
- Path alias'ları (`@app`, `@features`, `@shared`) import düzenini sade tutar.

## 5. Tema & Tasarım Sistemi
- Tasarım token'ları `src/shared/theme/tokens.ts` içinde tanımlıdır; light/dark temalar `modes/` altında bulunur.
- Tema sağlayıcısı `ThemeProvider` cihaz ayarı veya kullanıcının tercihini sağlar (`useThemePreference`).
- Yeni renk eklemek için `tokens` içindeki `colors` sözlüğünü güncelleyin ve iki temada karşılığını tanımlayın.
- Komponentler tema ile:
```tsx
const Title = styled(Text)(({theme}) => ({
  color: theme.colors.primary,
  marginBottom: theme.spacing.md,
}));
```

## 6. Navigation
- `AppNavigator` oturum durumuna göre Auth veya Main navigator'a yönlendirir.
- `AuthNavigator`: `Login`, `Register` stack'i (`createNativeStackNavigator`).
- `MainNavigator`: `Home`, `Profile` tab yapısı.
- Yeni route eklemek için `src/app/navigation/types.ts` dosyasına tip ekleyin, ilgili navigator'a `Screen` olarak bağlayın.

## 7. Authentication (Clerk)
- `ClerkProvider` publishable key ile (`appConfig.clerkPublishableKey`) `Providers` bileşeninde kuruludur.
- Token cache `secureStorage` kullanır (EncryptedStorage), session token'ı axios interceptor'a aktarılır.
- Akış: `LoginScreen` -> `signIn.create` -> `setActive` -> `AppNavigator` main'e geçer.
- Korumalı ekran örneği: `AppNavigator` `useAuth().isSignedIn` kontrolü yaparak Auth/Main ayrımı sunar. Gelişmiş senaryolarda `withAuth` HOC'u ile koruma sağlayın.

## 8. API Katmanı
- `shared/api/client.ts`: Axios instance, timeout, JSON varsayılanları, hata normalizasyonu, `Authorization` ve `x-api-key` header'ları.
- Yeni Endpoint Ekleme:
  1. `shared/api/endpoints.ts` içine tanım ekleyin (`method`, `buildPath`).
  2. İlgili feature service dosyasında `request` çağrısını kullanın.
  3. Gerekirse `shared/api/types.ts` veya feature `types/` altına tip ekleyin.
- API İsteği Atma örneği:
```ts
const user = await request<UserDto>({
  path: endpoints.profile.getProfile.buildPath(),
  method: endpoints.profile.getProfile.method,
});
```
- Retry/Cancel: `request` fonksiyonu `AbortSignal` alır. `new AbortController()` oluşturup `signal` göndermeniz yeterli.

## 9. Yeni Ekran (Screen) Ekleme (Adım Adım)
1. `features/<feature>/screens/<Name>Screen.tsx` oluşturun, `ScreenContainer` + shared komponentleri kullanın.
2. Ekranı küçük UI parçalarına bölmek için aynı feature altındaki `components/` klasörünü kullanın.
3. Navigasyona route ekleyin ve `types.ts`'i güncelleyin.
4. Stil ihtiyaçlarını temadan tüketin; business logic'i `services/` katmanına taşıyın.
5. Test eklemek için `__tests__` klasörü altında render testi yazabilirsiniz (opsiyonel fakat önerilir).

## 10. Yeni Feature Ekleme (Adım Adım)
1. `features/<Feature>` klasörü açın (`screens`, `components`, `services`, `types`).
2. Service dosyasında API çağrılarını `request` ile tanımlayın.
3. Route ekleyin; feature'lar arası paylaşılan UI'yı `shared/components`'a çıkarın.
4. README'deki örnekleri takip ederek form, tema ve store entegrasyonunu tamamlayın.

## 11. Formlar & Validasyon
- React Hook Form + Zod kullanın. Şema `z.object` ile; `zodResolver` formları TypeScript uyumlu yapar.
- Submit akışı: form -> service çağrısı -> loading state -> hata durumunda `normalizeError` -> UI'da `Text` veya toast.

## 12. State Yönetimi
- Global durum için Zustand seçildi. Neden? Minimal API, devtools entegrasyonu ve modüler store tanımları.
- Örnek: `useThemeStore` kullanıcı tercihini saklar (`persist` + AsyncStorage).
- Feature-local durum, component state veya feature-specific store'larda tutulur.

## 13. Depolama & Güvenlik
- `shared/storage/asyncStorage.ts`: genel key-value.
- `shared/storage/secureStorage.ts`: hassas veriler (`Clerk` tokenı vb.).
- Access token gibi kritik bilgiler UI state'inde tutulmaz, sadece storage + interceptor kombinasyonu ile yönetilir.

## 14. Hata & Loglama
- `normalizeError` tüm hataları `ApiError` tipine çevirir.
- Ağ hataları UI'da kullanıcı dostu mesajlara dönüştürülür (`Text` veya toast).
- Ek izleme için Sentry/NewRelic gibi servisler `logError` utility'si baz alınarak entegre edilebilir.

## 15. Kod Kalitesi
- ESLint (`yarn lint`), Prettier (`yarn format`), TypeScript (`yarn typecheck`).
- Husky pre-commit hook'u `lint-staged` ile staged dosyalarda lint/format uygular.
- `scripts/clean.sh` Metro & native cache temizliği sağlar.

## 16. Test
- Jest + React Native Testing Library. Örnekler:
  - `Button` bileşeni testi (`src/shared/components/__tests__/Button.test.tsx`).
  - `profileService` entegrasyon testi (`src/features/profile/services/__tests__/profileService.test.ts`).
- Komutlar: `yarn test`, `yarn test:watch`. Coverage için `yarn test --coverage`.

## 17. CI/CD (Opsiyonel)
Önerilen workflow (GitHub Actions):
```yml
name: CI
on: [push, pull_request]
jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: yarn install --frozen-lockfile
      - run: yarn lint && yarn typecheck && yarn test --coverage
```

## 18. Sık Yapılan İşler – Hızlı Rehber (Cheatsheet)
- Yeni ekran: `features/<feature>/screens`, navigator'a ekle, tema bileşenlerini kullan, servis çağrısını izole et.
- Yeni endpoint: `shared/api/endpoints.ts` + servis fonksiyonu + (gerekirse) tip.
- Yeni tema rengi: `shared/theme/modes/` dosyalarını güncelle, reusable componentlerde temadan oku.
- Reusable component: `shared/components` altında oluştur, sadece `props` ve tema ile çalış.

## 19. SSS / Sorun Giderme
- Metro cache? `yarn clean && yarn start --reset-cache`.
- Pod hatası? `cd ios && pod repo update && pod install`.
- Gradle build hatası? `./gradlew clean` ardından yeniden derleyin.
- ENV okunmuyor? `.env` değerlerini güncelleyin, uygulamayı yeniden başlatın.
- Clerk oturum sorunu? Publishable key'i doğrulayın, token cache (EncryptedStorage) temizleyin.
