export interface Materia {
  numero: string;
  nombre: string;
  slug: string;
  ano: '1' | '2' | '3' | '4';
  cuatrimestre: '1' | '2' | 'anual';
  icono?: string;
  color?: string;
  descripcion?: string;
  driveUrl?: string;
  analizadorUrl?: string;
  paraCursar: string[];
  paraRendir: string[];
  docentes?: Array<{ nombre: string; cargo: string; contacto?: string }>;
  unidades?: Array<{ numero: string; titulo: string; descripcion?: string; bibliografia?: string }>;
  enlacesAdicionales?: Array<{ titulo: string; url: string; descripcion?: string }>;
}

export function getAllMaterias(): Materia[] {
  const modules = import.meta.glob<Materia | { default: Materia }>('../data/materias/*.json', { eager: true });
  const materias: Materia[] = [];
  for (const path in modules) {
    const mod = modules[path] as any;
    const item = mod.default || mod;
    if (item && item.slug) {
      materias.push(item);
    }
  }
  return materias.sort((a, b) => parseInt(a.numero, 10) - parseInt(b.numero, 10));
}

export function getMateriaBySlug(slug: string): Materia | undefined {
  const materias = getAllMaterias();
  return materias.find(m => m.slug === slug);
}

export interface CuatrimestreGroup {
  label: string;
  cuatrimestre: '1' | '2' | 'anual';
  materias: Materia[];
}

export interface AnoGroup {
  ano: '1' | '2' | '3' | '4';
  label: string;
  cuatrimestres: CuatrimestreGroup[];
}

export function getMateriasTree(): AnoGroup[] {
  const materias = getAllMaterias();
  const anos: Array<{ ano: '1' | '2' | '3' | '4'; label: string }> = [
    { ano: '1', label: 'Primer Año' },
    { ano: '2', label: 'Segundo Año' },
    { ano: '3', label: 'Tercer Año' },
    { ano: '4', label: 'Cuarto Año' },
  ];

  return anos.map(a => {
    const materiasAno = materias.filter(m => m.ano === a.ano);
    const c1 = materiasAno.filter(m => m.cuatrimestre === '1');
    const c2 = materiasAno.filter(m => m.cuatrimestre === '2');
    const anual = materiasAno.filter(m => m.cuatrimestre === 'anual');

    const cuatrimestres: CuatrimestreGroup[] = [];
    if (c1.length > 0) cuatrimestres.push({ label: '1º Cuatrimestre', cuatrimestre: '1', materias: c1 });
    if (c2.length > 0) cuatrimestres.push({ label: '2º Cuatrimestre', cuatrimestre: '2', materias: c2 });
    if (anual.length > 0) cuatrimestres.push({ label: 'Anual', cuatrimestre: 'anual', materias: anual });

    return {
      ano: a.ano,
      label: a.label,
      cuatrimestres,
    };
  });
}

// Maps correlatividad text (e.g. "Psicología General (Regularizada)") to target slug
export function getSlugForCorrelativa(text: string, allMaterias: Materia[]): { slug?: string; name: string; status: 'R' | 'A' } {
  let status: 'R' | 'A' = 'R';
  if (text.includes('(Aprobada)') || text.includes('(A)')) status = 'A';

  // Normalize clean name and handle abbreviations
  const cleanName = text
    .replace(/\(Regularizada\)/gi, '')
    .replace(/\(Aprobada\)/gi, '')
    .replace(/\(R\)/gi, '')
    .replace(/\(A\)/gi, '')
    .replace(/\./g, '')
    .trim();

  const normalizeStr = (str: string) =>
    str
      .toLowerCase()
      .replace(/sist\./g, 'sistema')
      .replace(/sist /g, 'sistema ')
      .replace(/\./g, '')
      .trim();

  // Find fuzzy match
  const found = allMaterias.find(m => {
    const mClean = normalizeStr(m.nombre);
    const cClean = normalizeStr(cleanName);
    return mClean.includes(cClean) || cClean.includes(mClean);
  });

  return {
    slug: found ? found.slug : undefined,
    name: cleanName,
    status,
  };
}
