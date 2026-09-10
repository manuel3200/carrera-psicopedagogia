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

    docentes: singleton({
      label: 'Espacio Docente y Analizador',
      path: 'src/data/docentes/index',
      format: { data: 'json' },
      schema: {
        badge: fields.text({
          label: 'Etiqueta Superior',
          defaultValue: 'ESPACIO PARA EQUIPOS DE CÁTEDRA • SOPORTE Y HERRAMIENTAS',
        }),
        titulo: fields.text({
          label: 'Título Principal',
          defaultValue: 'Espacio Docente y Centro de Contacto',
        }),
        descripcion: fields.text({
          label: 'Descripción / Presentación',
          multiline: true,
          defaultValue: 'Este portal es un proyecto autogestionado por Manuel Ortiz, estudiante de la carrera de Psicopedagogía. Su finalidad es colaborar activamente con los profesores, adscriptos y auxiliares, centralizando el material bibliográfico, facilitando herramientas pedagógicas digitales y brindando un canal ágil para mantener las 32 cátedras actualizadas.',
        }),
        whatsappNumero: fields.text({
          label: 'Número de WhatsApp (con código de país)',
          defaultValue: '+54 370 502-1874',
        }),
        whatsappLink: fields.url({
          label: 'Enlace Directo de WhatsApp (wa.me)',
          defaultValue: 'https://wa.me/543705021874?text=Hola%20Manuel%2C%20te%20escribo%20desde%20el%20portal%20psp.joif.net%20para%20acercarte%20datos%20de%20la%20c%C3%A1tedra%3A',
        }),
        emailContacto: fields.text({
          label: 'Correo Electrónico de Contacto',
          defaultValue: 'manuelortiz1188@gmail.com',
        }),
        youtubeUrl: fields.text({
          label: 'Enlace al Video Tutorial de YouTube (ej: https://www.youtube.com/watch?v=... o https://youtu.be/...)',
          defaultValue: '',
        }),
        youtubeTitulo: fields.text({
          label: 'Título del Video Tutorial',
          defaultValue: 'Video Tutorial: Cómo configurar Google Forms y procesar el Excel',
        }),
        youtubeDescripcion: fields.text({
          label: 'Descripción del Video',
          multiline: true,
          defaultValue: 'Mirá en este video paso a paso cómo convertir tu formulario en cuestionario, asignar respuestas correctas y procesar las notas al instante en el analizador.',
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
