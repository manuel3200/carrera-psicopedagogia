import { config, fields, singleton } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'psi-evo-1/carrera-psicopedagogia',
  },
  ui: {
    brand: {
      name: 'Portal Psicopedagogía — CMS',
    },
  },
  singletons: {
    carrera: singleton({
      label: 'Información Institucional',
      path: 'src/data/carrera/index',
      format: { data: 'json' },
      schema: {
        nombreCarrera: fields.text({
          label: 'Nombre de la Carrera',
          defaultValue: 'Carrera de Psicopedagogía',
        }),
        subtitulo: fields.text({
          label: 'Subtítulo del Portal',
          defaultValue: 'Portal Académico & Red Central de Cátedras',
        }),
        cicloLectivo: fields.text({
          label: 'Ciclo Lectivo',
          defaultValue: 'Ciclo Lectivo 2026',
        }),
        heroTitulo: fields.text({
          label: 'Título de Portada',
          defaultValue: 'Red de Cátedras de Psicopedagogía',
        }),
        heroDescripcion: fields.text({
          label: 'Descripción de Portada',
          multiline: true,
          defaultValue: 'Portal central que nucleariza las diferentes materias, aulas virtuales y herramientas digitales de la carrera. Accedé a cada cátedra con su repositorio en Google Drive, panel CMS y procesador de autoevaluaciones.',
        }),
        footerDescripcion: fields.text({
          label: 'Descripción de Pie de Página',
          multiline: true,
          defaultValue: 'Portal central institucional que articula la red de cátedras y recursos digitales de la carrera.',
        }),
        footerCopy: fields.text({
          label: 'Texto de Copyright',
          defaultValue: '© 2026 Portal de la Carrera de Psicopedagogía. Red Jamstack 100% gratuita.',
        }),
      },
    }),

    catedras: singleton({
      label: 'Cátedras de la Carrera',
      path: 'src/data/catedras/index',
      format: { data: 'json' },
      schema: {
        tituloSeccion: fields.text({
          label: 'Título de Sección',
          defaultValue: 'Cátedras Integradas',
        }),
        descripcionSeccion: fields.text({
          label: 'Bajada de la Sección',
          multiline: true,
          defaultValue: 'Seleccioná la materia a la que deseás ingresar. Cada espacio cuenta con su propio repositorio bibliográfico en la nube, panel autogestionable y procesador pedagógico de autoevaluaciones.',
        }),
        lista: fields.array(
          fields.object({
            nombre: fields.text({ label: 'Nombre de la Materia' }),
            url: fields.url({ label: 'Enlace del Sitio Oficial' }),
            subdominio: fields.text({ label: 'Subdominio visible (ej: evo-1.joif.net)' }),
            icono: fields.text({ label: 'Icono / Emoji (ej: 🌱)' }),
            colorBorde: fields.text({ label: 'Color distintivo (ej: #3b82f6)' }),
            descripcion: fields.text({ label: 'Descripción breve de la materia', multiline: true }),
            caracteristica1: fields.text({ label: 'Punto destacado 1' }),
            caracteristica2: fields.text({ label: 'Punto destacado 2' }),
            caracteristica3: fields.text({ label: 'Punto destacado 3' }),
            urlAnalizador: fields.url({ label: 'Enlace al Analizador de Excel' }),
          }),
          {
            label: 'Cátedras Activas',
            itemLabel: props => props.fields.nombre.value || 'Nueva Cátedra',
          }
        ),
      },
    }),
  },
});
