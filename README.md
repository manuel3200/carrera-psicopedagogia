# Portal Web de la Cátedra de Psicopedagogía

Plataforma estática institucional, modular y 100% gratuita para la cátedra de Psicopedagogía, optimizada para desplegarse en **Cloudflare Pages**.

---

## 📁 Estructura del Proyecto

```
catedra-psicopedagogia/
├── index.html              # Portada: Bienvenida, presentación institucional y accesos por rol
├── materiales.html         # Material de estudio: Bibliografía Unidades 1 a 4 con buscador en vivo
├── profesores.html         # Portal Docente: Tutorial paso a paso + Acceso a autoevaluacion.juanconnect.online
├── sistemas.html           # Ecosistema: Hub extensible para futuras herramientas
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos sobrios, accesibles y responsivos (móvil, tablet, PC)
│   └── js/
│       └── main.js         # Menú responsive móvil y filtros de búsqueda
├── wrangler.jsonc          # Configuración para Cloudflare Pages
└── README.md               # Este instructivo
```

---

## 🚀 Cómo Probar en Local

Podés abrir los archivos directamente en tu navegador haciendo doble clic en `index.html`, o levantar un servidor local con cualquiera de estos comandos:

### Con Node.js (npx serve):
```bash
npx serve .
```

### Con Python:
```bash
python -m http.server 8080
```

Luego abrí en tu navegador: `http://localhost:8080`.

---

## ☁️ Cómo Desplegar 100% Gratis en Cloudflare Pages

Tenés dos opciones sencillas y gratuitas:

### Opción A: Con la línea de comandos (Wrangler)
1. Abrí la terminal dentro de esta carpeta (`f:\nuevometodoclaro\catedra-psicopedagogia`).
2. Iniciá sesión en Cloudflare (solo la primera vez):
   ```bash
   npx wrangler login
   ```
3. Desplegá el sitio web:
   ```bash
   npx wrangler pages deploy . --project-name=catedra-psicopedagogia
   ```
4. ¡Listo! Cloudflare te devolverá una URL pública con HTTPS gratuito (ejemplo: `https://catedra-psicopedagogia.pages.dev`).

### Opción B: Desde el panel web de Cloudflare (sin comandos)
1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com/) con tu cuenta gratuita.
2. Andá a **Workers & Pages** -> **Create application** -> pestaña **Pages** -> **Upload assets**.
3. Asignale el nombre `catedra-psicopedagogia`.
4. Arrastrá la carpeta `catedra-psicopedagogia` y hacé clic en **Deploy site**.

---

## 🛠️ Personalización de Enlaces

- **Carpeta de Google Drive:** En `materiales.html`, buscá el botón con `id="drive-catedra"` y reemplazá el enlace `https://drive.google.com` por el enlace compartido de la cátedra.
- **Descargas de PDFs:** En `materiales.html`, reemplazá los enlaces `href="#"` de cada lectura con el enlace directo a tus archivos PDF.
- **Analizador de Autoevaluaciones:** Ya se encuentra vinculado a `https://autoevaluacion.juanconnect.online/` en todos los botones de `profesores.html` e `index.html`.
