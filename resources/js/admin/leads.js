function initializeLeadDistribution() {
    const distributeButton = document.getElementById('distribute-leads');
    if (!distributeButton) return;

    distributeButton.addEventListener('click', async () => {
        try {
            distributeButton.disabled = true;
            const response = await fetch('/admin/leads/distribute', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();
            
            if (response.ok) {
                alert('Leads distributed successfully');
                window.location.reload();
            } else {
                throw new Error(data.message || 'Failed to distribute leads');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            distributeButton.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeLeadDistribution); 