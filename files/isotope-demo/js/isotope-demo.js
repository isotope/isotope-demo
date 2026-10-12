// Initialise the navigation supplied by the Contao demo.
document.documentElement.classList.add('js');

const menuToggle = document.querySelector('[data-nav-toggle]');
const german = document.documentElement.lang === 'de';
const navigation = new A11yNav({
    ariaLabels: {
        main: german ? 'Hauptnavigation' : 'Main menu',
        expand: german ? 'Menü öffnen: ' : 'Expand menu: ',
        collapse: german ? 'Menü schließen: ' : 'Collapse menu: ',
    },
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('show-nav-mobile')) {
        toggleNavigationState(false);
        navigation._focusMenu();
        menuToggle?.focus();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && document.body.classList.contains('show-nav-mobile')) {
        toggleNavigationState(false);
        navigation._focusMenu();
    }
});

// Label responsive shop tables, including tables replaced by Isotope fragments.
function labelShopTables() {
    document.querySelectorAll('[class*="content-iso-"] table').forEach((table) => {
        const headings = Array.from(table.querySelectorAll('thead th'), (th) => th.textContent.trim());
        table.querySelectorAll('tbody tr').forEach((row) => {
            let column = 0;
            Array.from(row.cells).forEach((cell) => {
                const label = cell.colSpan === 1 ? headings[column] || '' : '';
                if (cell.getAttribute('data-cellheadline') !== label) {
                    cell.setAttribute('data-cellheadline', label);
                }
                column += cell.colSpan;
            });
        });
    });
}

labelShopTables();
new MutationObserver(labelShopTables).observe(document.getElementById('container'), {
    childList: true,
    subtree: true,
});
