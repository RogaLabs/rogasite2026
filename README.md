# Site Roga Labs

Site institucional estático (HTML, CSS e JS puros, sem build). Para ver, é só abrir o `index.html` no navegador.

## Estrutura

```
index.html                  Home com todas as seções
politica-de-privacidade.html
assets/css/styles.css       Estilos (cores e fontes nas variáveis do topo)
assets/js/main.js           Menu, animações, formulário e WhatsApp
assets/img/                 Logos, favicon e imagem de compartilhamento (og-image)
```

## Antes de publicar

1. **Contato:** em `assets/js/main.js`, troque `CONFIG.email` e `CONFIG.whatsapp` pelos canais reais.
2. **Logos de clientes:** a faixa mostra TIM, Claro, Vivo, XP, BV (Votorantim), Gol, Central IT, Clinique, RE/MAX, Vivara, Run2biz, IMA Alagoas e Ecopar. Os logos de TIM, Claro, Vivo, XP, BV, Gol, Clinique, RE/MAX e Vivara vêm do Wikimedia Commons (carregados direto de upload.wikimedia.org); Central IT, Run2biz, IMA e Ecopar estão em `assets/img/clientes/` (versões coloridas, adaptadas para fundo claro). Para produção, baixe os SVGs para essa pasta e confirme a autorização de uso de cada marca.
3. **Cases:** substitua os textos por cases reais (setor · desafio · o que fizemos · resultado com número).
4. **Produtos:** atualize nomes, descrições e status.
5. **Números:** acrescente dados reais (projetos entregues, profissionais) quando tiver.
6. **Tecnologias:** ajuste para o stack que o time domina.
7. **Depoimentos:** a seção está pronta e comentada no HTML; ative quando tiver 2 ou 3.
8. **Política de privacidade:** revisar com o jurídico.
9. **Fotos:** as imagens atuais vêm do Unsplash (uso livre, carregadas direto de images.unsplash.com). Para produção, baixe e salve em `assets/img/` ou troque por fotos reais. A foto da seção **Time** é temporária e precisa virar uma foto real do time da Roga. Todas ficam em preto e branco e ganham cor ao passar o mouse.
10. **Insights:** os três cards são pautas sugeridas. Troque o `href="#"` pelo link de cada artigo e remova o selo "Em breve".
11. **IA:** confirme as ferramentas listadas em Tecnologias (OpenAI, Claude, LangChain, RAG, agentes e MCP).

Os pontos a revisar estão marcados com comentários `<!-- -->` no `index.html`.

## Formulário

Hoje o formulário abre o e-mail do visitante com a mensagem pronta. Para receber direto (sem depender do e-mail do visitante), aponte o `submit` em `main.js` para um serviço como Formspree, um endpoint próprio ou o CRM.

## Publicação

Por ser estático, publica em qualquer hospedagem: Render (Static Site), Netlify, Vercel, Cloudflare Pages ou GitHub Pages. Publish directory: raiz do projeto, sem comando de build.

## Paleta

| Uso | Cor |
|---|---|
| Fundo | `#080808` |
| Fundo alternado | `#0F0F0F` |
| Superfície (cards) | `#151515` / `#1C1C1C` |
| Texto | `#F2F2F2` |
| Texto secundário | `#9B9B9B` |
| Cinza grafite (IA, produtos, contato) | `#26272A` / `#323338` |
| Fundo claro (seções) | `#F5F4F0` / `#ECEBE6` |
| Botão principal | branco no escuro, preto no claro |
| Detalhe (tracinhos, checks, marcadores) | `#FF5A1F` |

Fontes: Sora (títulos), Inter (texto), JetBrains Mono (rótulos), via Google Fonts.
