const contentArea = document.getElementById('content');

async function loadContent(section) {
    try {
        const response = await fetch(`data/${section}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderContent(section, data);
    } catch (error) {
        console.error('Erro ao carregar o conteúdo:', error);
        contentArea.innerHTML = `<section class="fade-in"><h2 class="text-2xl font-bold mb-4">Erro ao carregar ${section}</h2><p>Não foi possível carregar o conteúdo desta seção. Por favor, tente novamente mais tarde.</p></section>`;
    }
}

function renderContent(section, data) {
    let htmlContent = '';

    switch (section) {
        case 'home':
            htmlContent = `
                <section id="home-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    <p class="text-lg">${data.description}</p>
                    <p class="mt-4">${data.content}</p>
                </section>
            `;
            break;
        case 'historia':
            htmlContent = `
                <section id="historia-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    <div class="relative border-l-2 border-blue-500 ml-4 pl-4">
                        ${data.events.map(event => `
                            <div class="mb-8 flex items-start">
                                <div class="w-4 h-4 bg-blue-500 rounded-full absolute -left-2 mt-1"></div>
                                <div class="ml-4">
                                    <h3 class="text-xl font-semibold">${event.year} - ${event.title}</h3>
                                    <p class="text-gray-700 dark:text-gray-300">${event.description}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
            break;
        case 'principios':
            htmlContent = `
                <section id="principios-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    ${data.principles.map((principle, index) => `
                        <div class="mb-4">
                            <button class="accordion-header w-full text-left p-4 bg-blue-100 dark:bg-blue-700 rounded-md font-semibold flex justify-between items-center">
                                ${principle.title}
                                <svg class="w-5 h-5 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div class="accordion-content hidden p-4 bg-gray-50 dark:bg-gray-700 rounded-b-md">
                                <p>${principle.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </section>
            `;
            break;
        case 'comparativo':
            htmlContent = `
                <section id="comparativo-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    <p class="mb-4">${data.description}</p>
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                            <thead>
                                <tr class="bg-blue-200 dark:bg-blue-600 text-left">
                                    ${data.headers.map(header => `<th class="py-2 px-4 border-b">${header}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                ${data.rows.map(row => `
                                    <tr>
                                        ${row.map(cell => `<td class="py-2 px-4 border-b">${cell}</td>`).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <button id="export-table" class="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300">Exportar para XLSX</button>
                </section>
            `;
            break;
        case 'casos':
            htmlContent = `
                <section id="casos-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    ${data.cases.map((caso, index) => `
                        <div class="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                            <h3 class="text-2xl font-semibold mb-2">${caso.title}</h3>
                            <p class="mb-4">${caso.description}</p>
                            <div class="mb-4">
                                <p class="font-semibold">Pergunta:</p>
                                <p>${caso.question}</p>
                            </div>
                            <button class="show-answer-button px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300" data-answer="${caso.answer}">Mostrar Resposta</button>
                            <div class="answer-feedback mt-4 hidden p-4 bg-blue-50 dark:bg-blue-800 rounded-md"></div>
                        </div>
                    `).join('')}
                </section>
            `;
            break;
        case 'desafios':
            htmlContent = `
                <section id="desafios-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    ${data.challenges.map((challenge, index) => `
                        <div class="mb-4">
                            <button class="accordion-header w-full text-left p-4 bg-blue-100 dark:bg-blue-700 rounded-md font-semibold flex justify-between items-center">
                                ${challenge.title}
                                <svg class="w-5 h-5 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div class="accordion-content hidden p-4 bg-gray-50 dark:bg-gray-700 rounded-b-md">
                                <p>${challenge.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </section>
            `;
            break;
        case 'glossario':
            htmlContent = `
                <section id="glossario-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        ${data.terms.map(term => `
                            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md">
                                <h3 class="text-xl font-semibold mb-2">${term.term}</h3>
                                <p>${term.definition}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
            break;
        case 'bibliografia':
            htmlContent = `
                <section id="bibliografia-section" class="fade-in">
                    <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                    <ul class="list-disc pl-5">
                        ${data.references.map(ref => `
                            <li class="mb-2"><a href="${ref.link}" target="_blank" class="text-blue-600 hover:underline">${ref.author}. <em>${ref.title}</em>. ${ref.publisher}, ${ref.year}.</a></li>
                        `).join('')}
                    </ul>
                </section>
            `;
            break;
        default:
            htmlContent = `
                <section class="fade-in">
                    <h2 class="text-2xl font-bold mb-4">Seção Não Encontrada</h2>
                    <p>O conteúdo para a seção "${section}" não está disponível.</p>
                </section>
            `;
    }

    contentArea.innerHTML = htmlContent;
    attachEventListeners(section);
    updateTitle(data.title);
}

function attachEventListeners(section) {
    if (section === 'principios' || section === 'desafios') {
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                content.classList.toggle('hidden');
                header.querySelector('svg').classList.toggle('rotate-180');
            });
        });
    }
    if (section === 'comparativo') {
        document.getElementById('export-table').addEventListener('click', exportTableToXLSX);
    }
    if (section === 'casos') {
        document.querySelectorAll('.show-answer-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const answer = event.target.dataset.answer;
                const feedbackDiv = event.target.nextElementSibling;
                feedbackDiv.innerHTML = `<p class="text-blue-800 dark:text-blue-200"><strong>Resposta:</strong> ${answer}</p>`;
                feedbackDiv.classList.remove('hidden');
            });
        });
    }
}

function exportTableToXLSX() {
    const table = document.querySelector('#comparativo-section table');
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Comparativo");
    XLSX.writeFile(wb, "comparativo_hermeneutica.xlsx");
}

function updateTitle(sectionTitle) {
    document.title = `Hermenêutica Reformada - ${sectionTitle}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    function handleNavigation(event) {
        event.preventDefault();
        const section = event.target.dataset.section;
        history.pushState({ section: section }, '', `#${section}`);
        loadContent(section);
        if (mobileMenu.classList.contains('block')) {
            mobileMenu.classList.remove('block');
            mobileMenu.classList.add('hidden');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('block');
        menuButton.setAttribute('aria-expanded', !isExpanded);
    });

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            loadContent(event.state.section);
        } else {
            loadContent('home');
        }
    });

    // Carregar a seção inicial ou a seção da URL
    const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
    loadContent(initialSection);
});


