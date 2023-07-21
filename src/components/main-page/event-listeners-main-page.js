export function addEventListenersMainPage() {
    addEventListenersViewOptions();
}



function addEventListenersViewOptions() {
    const selectedButtonsFilterOptions = document.querySelectorAll('.view-options-bar button');
    selectedButtonsFilterOptions.forEach((button) => {
        button.addEventListener('click', function() {
            if (!button.classList.contains('enabled')) {
                button.classList.add('enabled');
            } else {
                button.classList.remove('enabled');
            }
        });
    });

    const selectedSortOrderIcon = document.querySelector('.sort-options-box img');
    selectedSortOrderIcon.addEventListener('click', function() {
        if (!selectedSortOrderIcon.classList.contains('is-upward')) {
            selectedSortOrderIcon.classList.add('is-upward');
            selectedSortOrderIcon.setAttribute('src', '../src/originals/arrow-upward.svg');
        } else {
            selectedSortOrderIcon.classList.remove('is-upward');
            selectedSortOrderIcon.setAttribute('src', '../src/originals/arrow-downward.svg');
        }
    });
}
