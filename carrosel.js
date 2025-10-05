        const track2 = document.getElementById('carouselTrack');
        const imagePath = './logos_parceiros_limpa_nome'; // Ajuste o caminho da sua pasta se necessário
        const totalImages = 194;

        // Formatar número com zero à esquerda (01, 02, 03, etc)
        function formatNumber(num) {
            return num.toString().padStart(2, '0');
        }

        // Gerar os itens do carrossel (duplicar 2x para loop infinito)
        function createCarousel() {
            for (let round = 0; round < 2; round++) {
                for (let i = 1; i <= totalImages; i++) {
                    const item = document.createElement('div');
                    item.className = 'carousel-item';
                    
                    const img = document.createElement('img');
                    img.src = `${imagePath}/parceiro_${formatNumber(i)}.png`;
                    img.alt = `Parceiro ${i}`;
                    img.loading = 'lazy';
                    
                    img.onerror = function() {
                        this.src = 'https://via.placeholder.com/300x400?text=Parceiro+' + i;
                    };
                    
                    item.appendChild(img);
                    track2.appendChild(item);
                }
            }
        }

        createCarousel();

        // Animação com JavaScript
        let position = 0;
        const speed = 3; // Aumente este número para mais velocidade
        let isPaused = false;

        function animate() {
            if (!isPaused) {
                position -= speed;
                
                // Largura total de um item (100px) + gap (20px)
                const itemWidth = 120;
                const halfWidth = totalImages * itemWidth;
                
                // Reset quando completar metade do carrossel
                if (Math.abs(position) >= halfWidth) {
                    position = 0;
                }
                
                track2.style.transform = `translateX(${position}px)`;
            }
            
            requestAnimationFrame(animate);
        }

        // Pausar ao passar o mouse
        track2.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        track2.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Iniciar animação após carregar
        window.addEventListener('load', () => {
            animate();
        });