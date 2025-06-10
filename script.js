document.addEventListener('DOMContentLoaded', () => {
    const flowerButton = document.getElementById('flowerButton');
    const flowerContainer = document.getElementById('flowerContainer');

    flowerButton.addEventListener('click', () => {
        flowerContainer.classList.remove('hidden');
        flowerButton.classList.add('hidden');

        // Bersihkan kontainer bunga dari konten sebelumnya
        flowerContainer.innerHTML = ''; 

        // Buat beberapa bunga dengan posisi dan delay yang berbeda
        // (x, y, scale, stemAngle, delay)
        createFlowerInstance(flowerContainer, { x: '50%', y: '50px', scale: 1, stemAngle: 5, delay: 0 });
        createFlowerInstance(flowerContainer, { x: '25%', y: '100px', scale: 0.75, stemAngle: -10, delay: 0.4 });
        createFlowerInstance(flowerContainer, { x: '75%', y: '120px', scale: 0.85, stemAngle: 12, delay: 0.8 });
        
        createFallingPetals(); 
    });

    function createFlowerInstance(mainContainer, config) {
        const flowerWrapper = document.createElement('div');
        flowerWrapper.classList.add('flower-instance-wrapper'); // Kelas untuk wrapper
        flowerWrapper.style.setProperty('--flower-pos-x', config.x);
        flowerWrapper.style.setProperty('--flower-pos-y', config.y);
        flowerWrapper.style.setProperty('--flower-scale', config.scale);
        flowerWrapper.style.setProperty('--stem-angle-deg', `${config.stemAngle}deg`);
        flowerWrapper.style.setProperty('--base-animation-delay-sec', `${config.delay}s`);
        mainContainer.appendChild(flowerWrapper);

        const flowerArtContainer = document.createElement('div');
        flowerArtContainer.classList.add('flower-art-complex');
        flowerWrapper.appendChild(flowerArtContainer);

        const stem = document.createElement('div');
        stem.classList.add('flower-stem');
        flowerArtContainer.appendChild(stem);

        const leafData = [
            { className: 'leaf-left', delayBase: 0.7, angleOffset: -25, bottom: 50, sizeFactor: 0.9 },
            { className: 'leaf-right', delayBase: 0.9, angleOffset: 25, bottom: 75, sizeFactor: 1 }
        ];

        leafData.forEach(data => {
            const leaf = document.createElement('div');
            leaf.classList.add('flower-leaf');
            leaf.classList.add(data.className);
            leaf.style.setProperty('--leaf-angle-offset-deg', `${data.angleOffset}deg`);
            leaf.style.setProperty('--leaf-bottom-pos-px', `${data.bottom}px`);
            leaf.style.setProperty('--leaf-animation-delay-base', `${data.delayBase}s`);
            leaf.style.setProperty('--leaf-size-factor', data.sizeFactor);
            flowerArtContainer.appendChild(leaf);
        });
        
        const flowerHead = document.createElement('div');
        flowerHead.classList.add('flower-head-container');
        flowerArtContainer.appendChild(flowerHead);

        const layers = [
            {
                count: 16, 
                className: 'flower-layer-1',
                size: { width: '10px', height: '65px' }, 
                color: 'rgba(255, 105, 180, 0.8)', 
                borderRadius: '50% 50% 0 0', 
                spreadRadius: '65px', 
                animationName: 'complexBloom',
                baseDelay: 1.5, // Relatif terhadap --base-animation-delay-sec
                transformOrigin: '50% 100%'
            },
            {
                count: 16, 
                className: 'flower-layer-2',
                size: { width: '14px', height: '90px' }, 
                color: 'rgba(255, 182, 193, 0.7)', 
                borderRadius: '50% 50% 0 0',
                spreadRadius: '95px', 
                animationName: 'complexBloom',
                baseDelay: 1.7, // Relatif terhadap --base-animation-delay-sec
                rotationOffset: 11.25, // (360 / 16) / 2
                transformOrigin: '50% 100%'
            }
        ];

        layers.forEach((layer) => {
            for (let i = 0; i < layer.count; i++) {
                const element = document.createElement('div');
                element.classList.add('flower-element-complex');
                element.classList.add(layer.className);

                element.style.width = layer.size.width;
                element.style.height = layer.size.height;
                element.style.backgroundColor = layer.color;
                element.style.borderRadius = layer.borderRadius;
                element.style.transformOrigin = layer.transformOrigin;

                const angle = (360 / layer.count) * i + (layer.rotationOffset || 0);
                element.style.setProperty('--element-rotation-deg', `${angle}deg`);
                element.style.setProperty('--spread-radius-px', layer.spreadRadius);
                
                element.style.animationName = layer.animationName;
                // Delay animasi elemen = (delay dasar instance) + (delay dasar lapisan) + (delay per elemen)
                element.style.animationDelay = `calc(var(--base-animation-delay-sec) + ${layer.baseDelay}s + ${i * 0.06}s)`;

                flowerHead.appendChild(element);
            }
        });
    }

    function createFallingPetals() {
        const container = document.body;
        const numberOfPetals = 40; // Lebih banyak kelopak jatuh

        for (let i = 0; i < numberOfPetals; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.classList.add('petal');
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.animationDuration = (Math.random() * 4 + 3) + 's'; // Durasi lebih lama
                // petal.style.animationDelay = (Math.random() * 2) + 's'; // Dihapus, diatur oleh setTimeout
                
                const pinkShades = ['#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493', '#db7093', '#f8a1d1'];
                petal.style.backgroundColor = pinkShades[Math.floor(Math.random() * pinkShades.length)];
                petal.style.setProperty('--random-rotate-deg', `${Math.random() * 300 - 150}deg`);
                petal.style.width = `${Math.random() * 5 + 10}px`; // Variasi ukuran kelopak
                petal.style.height = `${Math.random() * 8 + 15}px`;

                container.appendChild(petal);

                petal.addEventListener('animationend', () => {
                    petal.remove();
                });
            }, Math.random() * 5000); // Kelopak jatuh muncul tersebar dalam 5 detik
        }
    }

    let styleSheet = document.getElementById('dynamic-flower-styles');
    if (!styleSheet) {
        styleSheet = document.createElement("style");
        styleSheet.id = 'dynamic-flower-styles';
        document.head.appendChild(styleSheet);
    }
    
    styleSheet.innerText = `
        .petal {
            position: fixed;
            top: -30px; /* Mulai sedikit lebih tinggi */
            /* width & height diatur oleh JS */
            border-radius: 50% 0 50% 50%;
            opacity: 0.8;
            pointer-events: none;
            animation-name: fall;
            animation-timing-function: cubic-bezier(0.1, 0.5, 0.9, 0.1); /* Kurva jatuh yang berbeda */
            z-index: 1000;
            transform: rotate(var(--initial-petal-rotate, 20deg));
        }

        @keyframes fall {
            0% {
                transform: translateY(0) rotate(var(--initial-petal-rotate, 20deg));
                opacity: 0.8;
            }
            100% {
                transform: translateY(105vh) rotate(calc(var(--initial-petal-rotate, 20deg) + var(--random-rotate-deg)));
                opacity: 0;
            }
        }

        .flower-instance-wrapper {
            position: absolute;
            left: var(--flower-pos-x);
            top: var(--flower-pos-y);
            transform: translate(-50%, 0) scale(var(--flower-scale));
            transform-origin: top center;
        }

        .flower-art-complex {
            position: relative;
            width: 280px; 
            height: 400px; 
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end; 
        }

        .flower-stem {
            width: 12px;
            height: 0; 
            background: linear-gradient(to top, #206A42, #2E8B57, #3CB371);
            border-radius: 6px 6px 0 0;
            animation: growStem 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
            animation-delay: var(--base-animation-delay-sec);
            opacity: 0;
            transform-origin: bottom center;
            transform: rotate(var(--stem-angle-deg));
            position: relative;
            z-index: 1;
        }

        @keyframes growStem {
            0% {
                height: 0;
                opacity: 0;
            }
            100% {
                height: 180px; 
                opacity: 1;
            }
        }

        .flower-leaf {
            position: absolute;
            width: calc(65px * var(--leaf-size-factor));
            height: calc(85px * var(--leaf-size-factor));
            background: linear-gradient(135deg, #4CAF50, #388E3C); /* Warna hijau daun lebih segar */
            opacity: 0;
            animation-name: unfoldLeaf;
            animation-duration: 1.1s;
            animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
            animation-fill-mode: forwards;
            animation-delay: calc(var(--base-animation-delay-sec) + var(--leaf-animation-delay-base));
            z-index: 0;
            bottom: var(--leaf-bottom-pos-px);
            filter: drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
        }

        .leaf-left {
            left: calc(50% - (30px * var(--leaf-size-factor))); 
            transform: rotate(calc(var(--stem-angle-deg) - 35deg + var(--leaf-angle-offset-deg)));
            transform-origin: bottom right;
            border-radius: 100% 0% 60% 40% / 100% 0% 70% 30%;
        }

        .leaf-right {
            left: calc(50% - (35px * var(--leaf-size-factor))); 
            transform: rotate(calc(var(--stem-angle-deg) + 35deg + var(--leaf-angle-offset-deg)));
            transform-origin: bottom left;
            border-radius: 0% 100% 40% 60% / 0% 100% 30% 70%;
        }

        @keyframes unfoldLeaf {
            0% {
                opacity: 0;
                transform: scale(0.1) rotate(calc(var(--stem-angle-deg) + var(--leaf-angle-offset-deg) / 1.5));
            }
            60% {
                opacity: 0.9;
                transform: scale(1.1) rotate(calc(var(--stem-angle-deg) + var(--leaf-angle-offset-deg)));
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(calc(var(--stem-angle-deg) + var(--leaf-angle-offset-deg)));
            }
        }
        
        .flower-head-container {
            position: relative;
            width: 220px; 
            height: 220px; 
            margin-bottom: -40px; /* Kepala bunga sedikit tumpang tindih dengan tangkai */
            opacity: 0;
            animation: fadeInHead 0.6s ease-out forwards;
            animation-delay: calc(var(--base-animation-delay-sec) + 1.3s); /* Delay setelah tangkai/daun mulai */
            z-index: 2;
            transform: rotate(var(--stem-angle-deg)); /* Kepala bunga mengikuti kemiringan tangkai */
            transform-origin: bottom center; /* Berputar dari dasar kepala bunga */
        }

        @keyframes fadeInHead {
            from { opacity: 0; transform: translateY(15px) scale(0.7) rotate(var(--stem-angle-deg)); }
            to { opacity: 1; transform: translateY(0) scale(1) rotate(var(--stem-angle-deg)); }
        }

        .flower-element-complex {
            position: absolute;
            top: 50%;
            left: 50%;
            opacity: 0; 
            animation-duration: 1.6s; 
            animation-fill-mode: forwards;
            animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Easing yang lebih halus */
            /* animation-delay diatur oleh JS */
        }

        @keyframes complexBloom {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.1) rotate(calc(var(--element-rotation-deg) - 40deg));
            }
            30% {
                opacity: 0.7;
                transform: translate(-50%, -50%) translateY(calc(var(--spread-radius-px) * -0.3)) rotate(calc(var(--element-rotation-deg) - 20deg)) scale(0.6);
            }
            100% {
                opacity: 1;
                transform: translate(-50%, -50%) translateY(calc(var(--spread-radius-px) * -1)) rotate(var(--element-rotation-deg)) scale(1);
            }
        }
    `;
});
