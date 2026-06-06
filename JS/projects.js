/* ============================= */
/* Project Category & Ranking    */
/* ============================= */

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectDropdown = document.getElementById('projectFilterSelect');
    const projectCards = document.querySelectorAll('.project-card');

    let projectDetailsData = null;

    fetch('./Assets/Projects-Details.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            projectDetailsData = data;
            console.log("Project details data loaded successfully from JSON.");
        })
        .catch(error => {
            console.error("Failed to load project details JSON:", error);
        });

    filterProjects('top-6');

    // Desktop & Tablet 
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

    /* ================================ */
    /* Project Full-Page Details        */
    /* ================================ */

    const projectMainContainer = document.querySelector('.project-container');
    const projectDetailsPage = document.getElementById('projectDetailsPage');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');

    const projectGithubTop = document.getElementById('projectGithubTop');
    const projectHeroImg = document.getElementById('projectHeroImg');
    const projectFullTitle = document.getElementById('projectFullTitle');
    const projectLongDesc = document.getElementById('projectLongDesc');
    const projectDetailsTags = document.getElementById('projectDetailsTags');
    const projectFeaturesList = document.getElementById('projectFeaturesList');
    const projectImpactList = document.getElementById('projectImpactList');
    const projectChallengesContainer = document.getElementById('projectChallengesContainer');
    const projectGalleryContainer = document.getElementById('projectGalleryContainer');

    projectCards.forEach(card => {
        const detailsBtn = card.querySelector('.card-actions .btn:nth-child(2)');
        if (!detailsBtn) return;

        detailsBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Extract project title & turn into key format ("Shinobi Saga" -> "shinobi-saga")
            const rawTitle = card.querySelector('.project-title').textContent;
            const projectKey = rawTitle.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

            const data = projectDetailsData[projectKey];
            if (data) {
                populateProjectDetails(data);
                switchView(true);
            }
        });
    });

    // Back Button
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            switchView(false);
            projectMainContainer.scrollIntoView({ behavior: 'smooth' });
        });
    }

    function populateProjectDetails(data) {
        projectFullTitle.textContent = data.title;
        projectHeroImg.src = data.banner;
        projectHeroImg.alt = `${data.title} Banner`;
        projectGithubTop.href = data.github;
        projectLongDesc.textContent = data.description;

        // Tech Tags
        projectDetailsTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Key Features
        projectFeaturesList.innerHTML = data.features.map(feat => `<li><span class="check-icon">✓</span> ${feat}</li>`).join('');

        // Results & Impact
        projectImpactList.innerHTML = data.impact.map(imp => {
            const parts = imp.split(': ');
            const emojiAndTitle = parts[0];
            const text = parts[1] || '';
            const emoji = emojiAndTitle.split(' ')[0];
            const titleText = emojiAndTitle.replace(emoji, '').trim();

            return `
                <li>
                    <span class="impact-emoji">${emoji}</span>
                    <div><strong>${titleText}:</strong> ${text}</div>
                </li>
            `;
        }).join('');

        // Challenges & Solutions
        projectChallengesContainer.innerHTML = data.challenges.map(item => `
            <div class="cs-wrapper">
                <div class="cs-block">
                    <div class="challenge-label">🚨 Challenge:</div>
                    <p class="cs-text">${item.challenge}</p>
                </div>
                <div class="cs-block">
                    <div class="solution-label">💡 Solution:</div>
                    <p class="cs-text">${item.solution}</p>
                </div>
            </div>
        `).join('');

        // Gallery Images
        projectGalleryContainer.innerHTML = data.gallery.map(item => `
            <div class="project-gallery-item">
                <img src="${item.src}" alt="${item.label}">
                <span class="project-gallery-label">${item.label}</span>
            </div>
        `).join('');
    }

    // Navigation toggle
    function switchView(showDetails) {
        if (showDetails) {
            projectMainContainer.style.display = 'none';
            projectDetailsPage.classList.add('active');
        } else {
            projectDetailsPage.classList.remove('active');
            projectMainContainer.style.display = 'block';
        }
    }
});