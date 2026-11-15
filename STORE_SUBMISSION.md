# Guía de Publicación — Google Play Store & Apple App Store

**Entre Dos** está configurada para publicarse como aplicación nativa híbrida (**Capacitor**) y como **PWA / TWA** sin servidor propio, sin anuncios y sin recolección de datos personales.

---

## 1. Datos Generales de la App

- **Nombre de la app**: `Entre Dos`
- **ID de paquete / Bundle ID**: `com.entredos.app`
- **Versión inicial**: `1.0.0`
- **Descripción corta (Play Store / Subtítulo App Store)**:
  `Su noche privada para romper la rutina, soltar el morbo y encender el deseo.`
- **Descripción completa sugerida**:
  > Entre Dos es una experiencia privada diseñada exclusivamente para parejas adultas (+18) que buscan encender el deseo a su propio ritmo en un solo teléfono.
  >
  > Incluye:
  > • Acceso +18 con confirmación mutua y dos intensidades (Suave y Rudo).
  > • 300 preguntas distintas sin repetir con indicador visual en azul y rosa.
  > • Más de 380 juegos sexuales con reloj integrado, incluyendo juegos orales.
  > • 160 tarjetas de Verdad o Reto entre confesiones directas y retos físicos.
  > • 64 posturas con animación coordinada y pasos esenciales.
  > • 100 % privada: sin cuentas, sin anuncios y sin enviar datos fuera del dispositivo.

---

## 2. Íconos y Recursos ya Incluidos en `public/`

- `public/store-icon-1024x1024.png` → **Apple App Store Connect** (1024×1024 px, RGB sin canal alfa).
- `public/pwa-512x512.png` → **Google Play Console** (ícono principal 512×512 px).
- `public/pwa-maskable-512x512.png` → **Android Adaptive Icon / Maskable** (zona segura centrada).
- `public/pwa-192x192.png` & `public/apple-touch-icon.png` (180×180 px) & `public/icon.svg` & `public/favicon.ico`.

---

## 3. Cómo generar los proyectos nativos `.aab` (Play Store) y `.ipa` (App Store)

Ejecuta en tu computadora (donde tengas Android Studio para Android y macOS + Xcode para iOS):

### Paso 1: Compilar la versión web
```bash
npm install
npm run build
```

### Paso 2: Crear y sincronizar Android e iOS con Capacitor
```bash
npx cap add android
npx cap add ios
npm run cap:sync
```

### Paso 3A: Compilar para Google Play Store (`.aab`)
```bash
npm run cap:android
```
1. En **Android Studio**, reemplaza los íconos de `android/app/src/main/res/mipmap-*` usando `Image Asset Studio` con `public/store-icon-1024x1024.png` y fondo `#09090B`.
2. Ve a **Build → Generate Signed Bundle / APK → Android App Bundle (.aab)**.
3. Sube el `.aab` en **Google Play Console**.

### Paso 3B: Compilar para Apple App Store (`.ipa`)
```bash
npm run cap:ios
```
1. En **Xcode**, abre `App → Assets.xcassets → AppIcon` y arrastra `public/store-icon-1024x1024.png`.
2. Configura tu **Signing & Capabilities** con tu cuenta de Apple Developer (`com.entredos.app`).
3. Selecciona **Any iOS Device (arm64) → Product → Archive → Distribute App → App Store Connect**.

*(Alternativa rápida para Android sin Xcode: usando la PWA ya configurada en HTTPS, puedes empaquetar un `.aab` TWA con Bubblewrap o PWABuilder).*

---

## 4. Cuestionarios Obligatorios de las Tiendas

### Privacidad y Seguridad de Datos (Play Store Data Safety & App Store Privacy)
- **¿Recopila datos del usuario?**: **No** (`Data Not Collected` / `No se recopilan datos`).
- **¿Comparte datos con terceros?**: **No**.
- **Almacenamiento**: 100 % local en el dispositivo (`localStorage`), con borrado inmediato dentro de la app.
- **Política de privacidad integrada**: Accesible dentro de la pantalla de inicio y del menú principal (`Privacidad y Términos +18`).

### Clasificación por Edad y Contenido
- **Apple App Store**: Seleccionar clasificación **17+** (temática adulta/sugerente frecuente) y activar la restricción de edad de la ficha.
- **Google Play Store**: Completar el cuestionario IARC indicando contenido **exclusivo para adultos (+18 / PEGI 18 / ESRB AO o M según región)**.
- **Importante sobre revisión de tiendas**: Tanto Apple (Guideline 1.1.4) como Google Play restringen lenguaje sexual explícito/gráfico dentro de apps públicas. Antes de enviar la versión final a revisión pública en tiendas oficiales, valida los textos en las fichas públicas (título, capturas y descripción en consola deben mantenerse elegantes y no explícitos) y ten en cuenta que el equipo revisor puede solicitar moderar las palabras más explícitas dentro de las barajas si la app se distribuye fuera de canales privados/web.
