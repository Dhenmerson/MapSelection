// Debug para verificar se o script está sendo executado

am5.ready(function() {
    
    // Declarar root fora do try para poder acessá-lo no dispose
    let root;
    
    try {
        // Criar a raiz do mapa
        root = am5.Root.new("mapdiv", {
            wheelable: false,
            wheelableX: false,
            wheelableY: false
        });

        // Criar o mapa
        let chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoMercator(),
                centerLongitude: -54,
                centerLatitude: -15,
                wheelable: false,
                wheelableX: false,
                wheelableY: false,
                mouseWheelBehavior: "none"
            })
        );

        // Desabilitar interações no canvas
        root.dom.style.touchAction = "none";
        root.dom.style.overflow = "hidden";

        // Criar a série de polígonos
        let polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: am5geodata_brazilLow,
                valueField: "value",
                calculateAggregates: true
            })
        );

        // Configuração dos estados
        polygonSeries.mapPolygons.template.setAll({
            fill: am5.color("#3B82F6"),
            strokeWidth: 1,
            strokeColor: am5.color("#ffffff"),
            tooltipText: "[bold]{name}[/]\n" +
                        "Sigla: {sigla}\n" +
                        "Capital: {capital}\n" +
                        "Região: {region}\n" +
                        "Área: {area} km²\n" +
                        "População: {population} habitantes\n" +
                        "Municípios: {municipalities}",
            interactive: true,
            cursorOverStyle: "pointer",
            fillOpacity: 0.7,
            shadowColor: am5.color("#000000"),
            shadowBlur: 0,
            shadowOpacity: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0
        });

        // Efeito hover com profundidade
        polygonSeries.mapPolygons.template.states.create("hover", {
            fillOpacity: 1,
            strokeWidth: 3,
            shadowColor: am5.color("#000000"),
            shadowBlur: 1,
            shadowOpacity: 0.1,
            shadowOffsetX: 0,
            shadowOffsetY: -15,
            animationDuration: 300,
            animationEasing: am5.ease.out(am5.ease.cubic),
            fill: am5.color("#2563EB")
        });

        // Dados dos estados
        const dadosEstados = {
            "BR-AC": { name: "Acre", sigla: "AC", capital: "Rio Branco", area: 164123.040, population: 894470, region: "Norte", municipalities: 22 },
            "BR-AL": { name: "Alagoas", sigla: "AL", capital: "Maceió", area: 27778.506, population: 3351543, region: "Nordeste", municipalities: 102 },
            "BR-AP": { name: "Amapá", sigla: "AP", capital: "Macapá", area: 142828.521, population: 861773, region: "Norte", municipalities: 16 },
            "BR-AM": { name: "Amazonas", sigla: "AM", capital: "Manaus", area: 1571000.174, population: 4207714, region: "Norte", municipalities: 62 },
            "BR-BA": { name: "Bahia", sigla: "BA", capital: "Salvador", area: 564733.177, population: 14985284, region: "Nordeste", municipalities: 417 },
            "BR-CE": { name: "Ceará", sigla: "CE", capital: "Fortaleza", area: 148920.472, population: 9187103, region: "Nordeste", municipalities: 184 },
            "BR-DF": { name: "Distrito Federal", sigla: "DF", capital: "Brasília", area: 5779.999, population: 3055149, region: "Centro-Oeste", municipalities: 1 },
            "BR-ES": { name: "Espírito Santo", sigla: "ES", capital: "Vitória", area: 46095.583, population: 4064052, region: "Sudeste", municipalities: 78 },
            "BR-GO": { name: "Goiás", sigla: "GO", capital: "Goiânia", area: 340111.783, population: 7113540, region: "Centro-Oeste", municipalities: 246 },
            "BR-MA": { name: "Maranhão", sigla: "MA", capital: "São Luís", area: 331937.450, population: 7114598, region: "Nordeste", municipalities: 217 },
            "BR-MT": { name: "Mato Grosso", sigla: "MT", capital: "Cuiabá", area: 903366.192, population: 3526220, region: "Centro-Oeste", municipalities: 141 },
            "BR-MS": { name: "Mato Grosso do Sul", sigla: "MS", capital: "Campo Grande", area: 357145.532, population: 2778986, region: "Centro-Oeste", municipalities: 79 },
            "BR-MG": { name: "Minas Gerais", sigla: "MG", capital: "Belo Horizonte", area: 586522.122, population: 21168791, region: "Sudeste", municipalities: 853 },
            "BR-PA": { name: "Pará", sigla: "PA", capital: "Belém", area: 1247954.666, population: 8602865, region: "Norte", municipalities: 144 },
            "BR-PB": { name: "Paraíba", sigla: "PB", capital: "João Pessoa", area: 56585.000, population: 4039277, region: "Nordeste", municipalities: 223 },
            "BR-PR": { name: "Paraná", sigla: "PR", capital: "Curitiba", area: 199307.922, population: 11516840, region: "Sul", municipalities: 399 },
            "BR-PE": { name: "Pernambuco", sigla: "PE", capital: "Recife", area: 98311.616, population: 9616621, region: "Nordeste", municipalities: 185 },
            "BR-PI": { name: "Piauí", sigla: "PI", capital: "Teresina", area: 251577.738, population: 3273227, region: "Nordeste", municipalities: 224 },
            "BR-RJ": { name: "Rio de Janeiro", sigla: "RJ", capital: "Rio de Janeiro", area: 43780.172, population: 17264943, region: "Sudeste", municipalities: 92 },
            "BR-RN": { name: "Rio Grande do Norte", sigla: "RN", capital: "Natal", area: 52811.047, population: 3506853, region: "Nordeste", municipalities: 167 },
            "BR-RS": { name: "Rio Grande do Sul", sigla: "RS", capital: "Porto Alegre", area: 281730.223, population: 11422973, region: "Sul", municipalities: 497 },
            "BR-RO": { name: "Rondônia", sigla: "RO", capital: "Porto Velho", area: 237590.547, population: 1796460, region: "Norte", municipalities: 52 },
            "BR-RR": { name: "Roraima", sigla: "RR", capital: "Boa Vista", area: 224300.506, population: 631181, region: "Norte", municipalities: 15 },
            "BR-SC": { name: "Santa Catarina", sigla: "SC", capital: "Florianópolis", area: 95736.165, population: 7252502, region: "Sul", municipalities: 295 },
            "BR-SP": { name: "São Paulo", sigla: "SP", capital: "São Paulo", area: 248222.362, population: 46289333, region: "Sudeste", municipalities: 645 },
            "BR-SE": { name: "Sergipe", sigla: "SE", capital: "Aracaju", area: 21915.116, population: 2318822, region: "Nordeste", municipalities: 75 },
            "BR-TO": { name: "Tocantins", sigla: "TO", capital: "Palmas", area: 277720.520, population: 1572866, region: "Norte", municipalities: 139 }
        };

        // Adicionar os dados aos estados
        polygonSeries.data.setAll(
            am5geodata_brazilLow.features.map(feature => {
                const estado = dadosEstados[feature.id];
                if (estado) {
                    return {
                        id: feature.id,
                        name: estado.name,
                        sigla: estado.sigla,
                        capital: estado.capital,
                        area: estado.area.toLocaleString('pt-BR', {maximumFractionDigits: 2}),
                        population: estado.population.toLocaleString('pt-BR'),
                        region: estado.region,
                        municipalities: estado.municipalities
                    };
                }
                return feature.properties;
            })
        );

        // Zoom inicial ajustado
        chart.set("zoom", 2.8);

        // Centralizar o mapa
        chart.set("centerLongitude", -54);
        chart.set("centerLatitude", -15);

        // Desabilitar eventos de zoom no canvas
        root.dom.addEventListener("wheel", function(e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }, { passive: false });

        // Desabilitar eventos de zoom em todos os elementos canvas
        setTimeout(function() {
            let canvases = document.querySelectorAll("canvas");
            canvases.forEach(function(canvas) {
                canvas.style.touchAction = "none";
                canvas.style.overflow = "hidden";
                canvas.addEventListener("wheel", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                }, { passive: false });
            });
        }, 100);

    } catch (error) {
        console.error("Erro ao carregar o mapa:", error);
    }

    // Limpar recursos quando a página for fechada
    window.addEventListener("beforeunload", function() {
        if (root) {
            root.dispose();
        }
    });
}); 