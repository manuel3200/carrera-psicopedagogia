/**
 * CÁTEDRA DE PSICOPEDAGOGÍA - LÓGICA DE INTERACCIÓN
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Control del menú móvil
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // 2. Filtro en vivo de materiales de estudio (en materiales.html)
  const searchInput = document.getElementById('searchMaterials');
  const filterPills = document.querySelectorAll('.filter-pill');
  const materialItems = document.querySelectorAll('.material-item');
  const unitBlocks = document.querySelectorAll('.unit-block');

  if (searchInput && materialItems.length > 0) {
    function filterContent() {
      const query = searchInput.value.toLowerCase().trim();
      const activeUnit = document.querySelector('.filter-pill.active')?.dataset.unit || 'all';

      unitBlocks.forEach(unit => {
        const unitId = unit.dataset.unitId;
        const matchesUnit = (activeUnit === 'all' || activeUnit === unitId);
        let visibleInUnit = 0;

        const itemsInUnit = unit.querySelectorAll('.material-item');
        itemsInUnit.forEach(item => {
          const text = item.textContent.toLowerCase();
          const matchesQuery = text.includes(query);

          if (matchesUnit && matchesQuery) {
            item.style.display = 'flex';
            visibleInUnit++;
          } else {
            item.style.display = 'none';
          }
        });

        // Ocultar bloque de unidad si no tiene items visibles
        unit.style.display = (visibleInUnit > 0) ? 'block' : 'none';
      });
    }

    searchInput.addEventListener('input', filterContent);

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        filterContent();
      });
    });
  }

  // 3. Resaltar página actual en navegación
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
