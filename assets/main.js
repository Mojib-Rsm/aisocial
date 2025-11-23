document.addEventListener('DOMContentLoaded', () => {
    // --- Copy Button Functionality ---
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-text');
            if (!textToCopy) return;

            const originalContent = button.innerHTML;

            navigator.clipboard.writeText(textToCopy).then(() => {
                button.innerHTML = '<i class="lucide-check text-green-500"></i><span class="ml-1.5">Copied!</span>';
                button.classList.add('bg-green-100', 'text-green-700');

                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('bg-green-100', 'text-green-700');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text.');
            });
        });
    });
});
