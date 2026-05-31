/* ============================= */
/* Project Category & Ranking    */
/* ============================= */

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectDropdown = document.getElementById('projectFilterSelect');
    const projectCards = document.querySelectorAll('.project-card');

    filterProjects('top-6');

    // Desktop & Tablet Button 
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');

            const targetFilter = button.getAttribute('data-filter');
            filterProjects(targetFilter);

            if (projectDropdown) {
                projectDropdown.value = targetFilter;
            }
        });
    });

    // Mobile Dropdown
    if (projectDropdown) {
        projectDropdown.addEventListener('change', (e) => {
            const selectedFilter = e.target.value;
            filterProjects(selectedFilter);

            filterButtons.forEach(btn => {
                if (btn.getAttribute('data-filter') === selectedFilter) {
                    document.querySelector('.filter-btn.active').classList.remove('active');
                    btn.classList.add('active');
                }
            });
        });
    }

    function filterProjects(filterValue) {
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-category') || '';

            if (filterValue === 'all' || cardCategories.split(' ').includes(filterValue)) {
                card.classList.remove('hide');

                const rankValue = card.getAttribute(`data-rank-${filterValue}`);

                if (rankValue) {
                    card.style.order = rankValue;
                } else {
                    card.style.order = '999';
                }

            } else {
                card.classList.add('hide');
                card.style.order = '';
            }
        });
    }
});