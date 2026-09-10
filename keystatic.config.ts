import { collection, config, fields, singleton } from '@keystatic/core';

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
    project: 'psi-evo-1/carrera-psp',
  },
  ui: {
    brand: {
      name: 'Vault Psicopedagogía — CMS',
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
          defaultValue: 'Espacio independiente creado por un estudiante con el fin de facilitar y organizar el acceso a los archivos, bibliografía y recursos de las diversas cátedras de la carrera.',
        }),
        footerDescripcion: fields.text({
          label: 'Descripción de Pie de Página',
          multiline: true,
          defaultValue: 'Espacio colaborativo creado por un estudiante para nuclear y facilitar los recursos de las cátedras de la carrera.',
        }),
        footerCopy: fields.text({
          label: 'Texto de Copyright',
          defaultValue: '© 2026 Portal de la Carrera de Psicopedagogía. Proyecto independiente y gratuito.',
        }),
      },
    }),
  },
  collections: {
    materias: collection({
      label: 'Materias de la Carrera (32 Cátedras)',
      slugField: 'slug',
      path: 'src/data/materias/*',
      format: { data: 'json' },
      schema: {
        numero: fields.text({
          label: 'Número de Materia (ej: 01)',
          validation: { isRequired: true },
        }),
        nombre: fields.text({
          label: 'Nombre Oficial de la Materia',
          validation: { isRequired: true },
        }),
        slug: fields.slug({
          name: {
            label: 'Slug / URL corta (ej: filosofia)',
          },
        }),
        ano: fields.select({
          label: 'Año de Cursada',
          options: [
            { label: 'Primer Año', value: '1' },
            { label: 'Segundo Año', value: '2' },
            { label: 'Tercer Año', value: '3' },
            { label: 'Cuarto Año', value: '4' },
          ],
          defaultValue: '1',
        }),
        cuatrimestre: fields.select({
          label: 'Cuatrimestre',
          options: [
            { label: '1º Cuatrimestre', value: '1' },
            { label: '2º Cuatrimestre', value: '2' },
            { label: 'Anual', value: 'anual' },
          ],
          defaultValue: '1',
        }),
        icono: fields.text({
          label: 'Emoji / Ícono representativo',
          defaultValue: '📚',
        }),
        color: fields.text({
          label: 'Color distintivo (Hexadecimal, ej: #7c3aed)',
          defaultValue: '#7c3aed',
        }),
        descripcion: fields.text({
          label: 'Descripción o Fundamentación de la Cátedra',
          multiline: true,
        }),
        driveUrl: fields.url({
          label: 'Enlace a Carpeta Oficial de Google Drive',
        }),
        analizadorUrl: fields.url({
          label: 'Enlace al Analizador de Autoevaluaciones (Opcional)',
        }),
        paraCursar: fields.array(
          fields.text({ label: 'Requisito para cursar' }),
          {
            label: 'Correlatividades para Cursar (Resolución 18/13)',
            itemLabel: props => props.value || 'Requisito',
          }
        ),
        paraRendir: fields.array(
          fields.text({ label: 'Requisito para rendir final' }),
          {
            label: 'Correlatividades para Rendir Final (Resolución 18/13)',
            itemLabel: props => props.value || 'Requisito',
          }
        ),
        docentes: fields.array(
          fields.object({
            nombre: fields.text({ label: 'Nombre del Docente' }),
            cargo: fields.text({ label: 'Cargo (Titular, Adjunto, JTP)' }),
            contacto: fields.text({ label: 'Contacto / Email (opcional)' }),
          }),
          {
            label: 'Equipo Docente',
            itemLabel: props => props.fields.nombre.value || 'Docente',
          }
        ),
        unidades: fields.array(
          fields.object({
            numero: fields.text({ label: 'Nº Unidad / Eje' }),
            titulo: fields.text({ label: 'Título de la Unidad' }),
            descripcion: fields.text({ label: 'Contenidos / Ejes temáticos', multiline: true }),
            bibliografia: fields.text({ label: 'Bibliografía sugerida', multiline: true }),
          }),
          {
            label: 'Unidades Temáticas y Contenidos',
            itemLabel: props => `Unidad ${props.fields.numero.value}: ${props.fields.titulo.value || 'Sin título'}`,
          }
        ),
        enlacesAdicionales: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Título del Enlace' }),
            url: fields.url({ label: 'Enlace / URL' }),
            descripcion: fields.text({ label: 'Descripción breve' }),
          }),
          {
            label: 'Recursos y Enlaces Adicionales',
            itemLabel: props => props.fields.titulo.value || 'Nuevo Enlace',
          }
        ),
      },
    }),
  },
});
